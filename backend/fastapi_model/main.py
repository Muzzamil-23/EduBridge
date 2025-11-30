import joblib
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
import os
from dotenv import load_dotenv


# ==========================================================
#                  FASTAPI INITIALIZATION
# ==========================================================
app = FastAPI(title="EduBridge Recommendation API", version="2.1")

ENV = os.getenv("ENV", "development")
PORT = int(os.getenv("PORT", 8000))
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

origins = [FRONTEND_URL]
if ENV == "development":
    origins.append("http://localhost:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

encoded_df = None
original_df = None


# ==========================================================
#                  LOAD DATA ON STARTUP
# ==========================================================
@app.on_event("startup")
async def load_data():
    global encoded_df, original_df
    try:
        encoded_df = pd.read_csv("uni_final_merged_encoded_scaled.csv")
        original_df = pd.read_csv("uni_final.csv")

        if len(encoded_df) != len(original_df):
            print("⚠ Warning: Row count mismatch between encoded and original datasets!")

        print(f"✅ Data loaded successfully. Encoded: {encoded_df.shape}, Original: {original_df.shape}")

    except Exception as e:
        print(f"❌ Error loading data: {e}")
        raise e


@app.get("/")
def root():
    return {"status": "running", "message": "EduBridge Recommendation API active ✅"}


# ==========================================================
#                  REQUEST MODELS
# ==========================================================
class UserPreferences(BaseModel):
    preferred_university_type: Optional[str] = None
    preferred_program_group: Optional[str] = None
    desired_semester_fee: Optional[float] = None
    requires_entry_test: Optional[bool] = None
    requires_hostel: Optional[bool] = None
    requires_transport: Optional[bool] = None
    desired_fee_per_credit_hr: Optional[float] = None
    desired_admission_fee: Optional[float] = None
    desired_credit_hours: Optional[float] = None
    num_recommendations: int = 10


class SupabaseRequest(BaseModel):
    user_id: str


class RecommendationItem(BaseModel):
    university_id: str
    program_id: str
    similarity_score: Optional[float] = None


class SaveRecommendationsRequest(BaseModel):
    user_id: str
    recommendations: list[RecommendationItem]


# ==========================================================
#                  SUPABASE CONFIGURATION
# ==========================================================
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("❌ Missing Supabase credentials in .env")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


def get_user_preferences_from_supabase(user_id: str):
    """Fetch user preferences by user_id from Supabase."""
    try:
        response = supabase.table("student_academic_data").select("*").eq("user_id", user_id).execute()

        if not response.data or len(response.data) == 0:
            return None

        user_data = response.data[0]
        print(f"📦 Supabase data fetched for user_id={user_id}: {user_data}")
        return user_data

    except Exception as e:
        print(f"❌ Supabase fetch error: {e}")
        return None


# ==========================================================
#              HELPER — PROGRAM GROUP NORMALIZATION
# ==========================================================
def normalize_program_group(name: Optional[str]) -> Optional[str]:
    """Normalize program group strings to match dataset column format."""
    if not name:
        return None
    # Replace slashes and extra spaces
    name = name.replace("/", "&").replace("and", "&").strip()
    name = name.replace("  ", " ")
    # Common cleanup for known variants
    replacements = {
        "Computer Science / IT": "Computer Science & IT",
        "Computer Science/IT": "Computer Science & IT",
        "CS / IT": "Computer Science & IT",
        "Business / Management": "Business & Management",
        "Engineering / Technology": "Engineering & Technology",
        "Medical / Health Sciences": "Medical & Health Sciences"
    }
    return replacements.get(name, name)


# ==========================================================
#                  USER VECTOR CREATION
# ==========================================================
def preprocess_user_vector(preferences: UserPreferences):
    """Create a vector aligned with encoded dataset columns."""
    user_vector = pd.DataFrame(0, index=[0], columns=encoded_df.columns)

    # --- Mappings ---
    type_mapping = {"public": 1, "private": 0}
    bool_mapping = {True: 1, False: 0}

    # --- University Type ---
    if preferences.preferred_university_type and "Type" in user_vector.columns:
        user_vector["Type"] = type_mapping.get(preferences.preferred_university_type.lower(), 0)

    # --- Booleans ---
    if "Entry_Test_Required" in user_vector.columns:
        user_vector["Entry_Test_Required"] = bool_mapping.get(preferences.requires_entry_test, 0)
    if "Hostel" in user_vector.columns:
        user_vector["Hostel"] = bool_mapping.get(preferences.requires_hostel, 0)
    if "Transport" in user_vector.columns:
        user_vector["Transport"] = bool_mapping.get(preferences.requires_transport, 0)

    # --- One-hot program group ---
    if preferences.preferred_program_group:
        normalized_group = normalize_program_group(preferences.preferred_program_group)
        col = f"program_group_{normalized_group.strip()}"
        if col in user_vector.columns:
            user_vector[col] = 1
        else:
            print(f"⚠ No exact match for program group column: {col}")

    # --- Numeric values (log scaled to stay in encoded range) ---
    numeric_map = {
        "Fee_per_credit_hr": preferences.desired_fee_per_credit_hr,
        "Admission_Fee": preferences.desired_admission_fee,
        "Semester Fee": preferences.desired_semester_fee,
        "Credit Hours": preferences.desired_credit_hours,
    }

    for col, val in numeric_map.items():
        if val is not None and col in user_vector.columns:
            user_vector[col] = np.log1p(val) / 10  # mild scaling

    return user_vector


# ==========================================================
#                  CORE RECOMMENDER ENGINE 🤣
# ==========================================================
# @app.post("/recommendations")
# async def get_recommendations(preferences: UserPreferences):
#     """Return university + program recommendations based on preferences."""
#     if encoded_df is None or original_df is None:
#         raise HTTPException(status_code=500, detail="Datasets not loaded properly")

#     user_vector = preprocess_user_vector(preferences)
#     user_vector_np = user_vector.values

#     # --- Filter by program group ---
#     filtered_encoded = encoded_df.copy()
#     filtered_original = original_df.copy()

#     if preferences.preferred_program_group:
#         normalized_group = normalize_program_group(preferences.preferred_program_group)
#         col = f"program_group_{normalized_group.strip()}"
#         if col in filtered_encoded.columns:
#             mask = filtered_encoded[col] == 1
#             filtered_encoded = filtered_encoded[mask]
#             filtered_original = filtered_original[mask]

#     if filtered_encoded.empty:
#         raise HTTPException(status_code=404, detail="No programs found for selected program group")

#     # --- Cosine similarity ---
#     similarity_scores = cosine_similarity(user_vector_np, filtered_encoded.values)[0]
#     filtered_original = filtered_original.copy()
#     filtered_original["similarity_score"] = similarity_scores

#     # --- Rank results ---
#     ranked = filtered_original.sort_values("similarity_score", ascending=False)

#     top_results = ranked.head(preferences.num_recommendations)[
#         ["University", "Program", "similarity_score"]
#     ].to_dict(orient="records")

#     return top_results


@app.post("/recommendations")
async def get_recommendations(preferences: UserPreferences):
    """Return university + program recommendations based on preferences."""
    if encoded_df is None or original_df is None:
        raise HTTPException(status_code=500, detail="Datasets not loaded properly")

    user_vector = preprocess_user_vector(preferences)
    user_vector_np = user_vector.values

    # --- Filtered copies ---
    filtered_encoded = encoded_df.copy()
    filtered_original = original_df.copy()



    # ==========================================================
    #  FILTER 1: Program Group
    # ==========================================================
    if preferences.preferred_program_group:
        normalized_group = normalize_program_group(preferences.preferred_program_group)
        col = f"program_group_{normalized_group.strip()}"
        if col in filtered_encoded.columns:
            mask = filtered_encoded[col] == 1
            filtered_encoded = filtered_encoded[mask]
            filtered_original = filtered_original[mask]


    # ==========================================================
    #  FILTER 3: Semester Fee within tolerance (±10%)
    # ==========================================================
    if "Semester Fee" in filtered_original.columns:
        # Convert any string fees like "120,000" to numeric
        filtered_original["Semester Fee"] = pd.to_numeric(
            filtered_original["Semester Fee"].astype(str).str.replace(",", ""), errors="coerce"
        )
        filtered_original = filtered_original.dropna(subset=["Semester Fee"])

    if preferences.desired_semester_fee:
        # Define tolerance — adjust if needed (1.05 = 5% above, 1.1 = 10%)
        tolerance = 1.10  
        max_fee = preferences.desired_semester_fee * tolerance

        # Apply filter
        affordable_mask = filtered_original["Semester Fee"] <= max_fee
        filtered_encoded = filtered_encoded[affordable_mask]
        filtered_original = filtered_original[affordable_mask]

        if filtered_encoded.empty:
            raise HTTPException(status_code=404, detail="No programs found within your budget range.")


    # ==========================================================
    #  HANDLE NO RESULTS AFTER FILTERS
    # ==========================================================
    if filtered_encoded.empty:
        raise HTTPException(status_code=404, detail="No programs found for selected filters")

    # ==========================================================
    #  COSINE SIMILARITY
    # ==========================================================
    similarity_scores = cosine_similarity(user_vector_np, filtered_encoded.values)[0]
    filtered_original = filtered_original.copy()
    filtered_original["similarity_score"] = similarity_scores

    # ==========================================================
    #  RANK RESULTS
    # ==========================================================
    ranked = filtered_original.sort_values("similarity_score", ascending=False)

    top_results = ranked.head(preferences.num_recommendations)[
        ["University", "Program", "similarity_score", "Semester Fee", "Type"]
    ].to_dict(orient="records")

    return top_results






# ==========================================================
#              SUPABASE-BASED RECOMMENDATIONS
# ==========================================================
@app.post("/recommendations/from_supabase")
async def get_recommendations_from_supabase(request: SupabaseRequest):
    """Generate recommendations based on Supabase user data."""
    user_data = get_user_preferences_from_supabase(request.user_id)

    if not user_data:
        raise HTTPException(status_code=404, detail=f"No user data found for user_id={request.user_id}")

    # --- Normalize and map Supabase fields ---
    normalized_program_group = normalize_program_group(user_data.get("preferred_program_group"))

    preferences = UserPreferences(
        preferred_university_type=user_data.get("preferred_university_type"),
        preferred_program_group=normalized_program_group,
        requires_entry_test=user_data.get("entry_test_requirement"),
        requires_hostel=user_data.get("hostel_requirement"),
        requires_transport=user_data.get("transport_requirement"),
        desired_semester_fee=user_data.get("per_semester_budget"),
        desired_fee_per_credit_hr=user_data.get("fee_per_credit_hr"),
        desired_admission_fee=user_data.get("desired_admission_fee"),
        desired_credit_hours=user_data.get("desired_credit_hours"),
    )

    print(f"🎯 Normalized & converted Supabase data to preferences: {preferences.dict()}")
    return await get_recommendations(preferences)


@app.post("/recommendations/save")
async def save_recommendations(request: SaveRecommendationsRequest):
    """Insert or update user recommendations in the database."""
    user_id = request.user_id
    recommendations = request.recommendations

    if not recommendations:
        raise HTTPException(status_code=400, detail="No recommendations provided")

    inserted_count = 0
    updated_count = 0

    for rec in recommendations:
        # Upsert recommendation into Supabase
        response = supabase.table("recommendations").upsert(
            {
                "user_id": user_id,
                "university_id": rec.university_id,
                "program_id": rec.program_id,
                "similarity_score": rec.similarity_score
            },
            on_conflict=["user_id", "university_id", "program_id"]
        ).execute()

        # You can count inserts/updates based on response if needed
        inserted_count += 1

    return {
        "status": "success",
        "message": f"{inserted_count} recommendations saved/updated successfully."
    }

