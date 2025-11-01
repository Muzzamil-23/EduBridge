import { create } from "zustand";
import axios from "axios";
import { useUniversityStore } from "./useUniversityStore";
import universityService from "../supabase/univeristyService";
import { supabase } from "../supabase/config";
import stringSimilarity from "string-similarity";

const API_BASE = import.meta.env.VITE_API_URL;

export const useDashboardStore = create((set, get) => ({
  recommendations: [],
  loading: false,
  error: null,

  stats: {
    savedUniversities: 0,
    totalSearches: 0,
    recommendedCount: 0,
  },

  // ======================================================
  // 🧩 FETCH RECOMMENDATIONS (Supabase → Backend fallback)
  // ======================================================
  fetchRecommendations: async (userId) => {
    if (!userId) {
      console.error("❌ Missing userId for recommendations request");
      set({ error: "User ID not provided" });
      return;
    }

    const { recommendations } = get();

    // ⚡ Skip if already loaded in Zustand store
    if (recommendations.length > 0) {
      console.log("⚡ Using cached recommendations from store");
      return;
    }

    set({ loading: true, error: null });

    try {
      const { data, error } = await supabase
  .from("user_recommendations")
  .select(`
    id,
    similarity_score,
    created_at,
    programs (
      id,
      program_name,
      program_group,
      universities (
        uni_id,
        university_name,
        city,
        type,
        accreditations,
        has_hostel,
        has_transport,
        extracurriculars,
        website,
        established,
        Apply,
        Location,
        about,
        contact,
        image_url,
        logo_url,
        email_address
      ),
      university_program_features (
        feature_id,
        admission_fee,
        semester_fee,
        credit_hours,
        min_academic_percent,
        min_test_score,
        entry_test_required,
        fee_per_credit_hr
      )
    )
  `)
  .eq("user_id", userId);


      if (error) throw error;

      if (data && data.length > 0) {
        // console.log("✅ Loaded recommendations (joined) from Supabase:", data);
        set({ recommendations: data, loading: false });
        return; // 🛑 No backend call needed
      }

      // 🧩 2️⃣ If Supabase empty → fetch from backend
      console.log("🌐 No cache found — fetching from backend...");
      const response = await axios.post(
        `${API_BASE}/recommendations/from_supabase`,
        { user_id: userId },
        { headers: { "Content-Type": "application/json" } }
      );

      const recs = response.data || [];
      const { universities } = useUniversityStore.getState();
      const normalize = (str) => str?.trim().toLowerCase().replace(/\s+/g, "");

      // 🧠 Map recommendations to actual uni + program IDs
      const mappedRecs = await Promise.all(
        recs.map(async (rec) => {
          const uni = universities.find((u) => {
            const score = stringSimilarity.compareTwoStrings(
              normalize(u.university_name),
              normalize(rec.University)
            );
            return score > 0.85;
          });

          if (!uni) {
            console.warn("⚠ University not matched:", rec.University);
            return { ...rec, uni_id: null, program_id: null };
          }

          if (!uni.programs || uni.programs.length === 0) {
            const fullUni = await universityService.getUniversityWithPrograms(
              uni.uni_id
            );
            uni.programs = fullUni.programs || [];
          }

          const program =
            uni.programs.find((p) => {
              const score = stringSimilarity.compareTwoStrings(
                normalize(p.program_name),
                normalize(rec.Program)
              );
              return score > 0.85;
            }) || null;

          return {
            ...rec,
            uni_id: uni.uni_id,
            program_id: program?.id || null,
          };
        })
      );

      // console.log("🧭 Final mapped recommendations:", mappedRecs);
      set({ recommendations: mappedRecs, loading: false });

      // 🧩 3️⃣ Save to Supabase cache
      await get().saveRecommendations(userId);
    } catch (err) {
      console.error("❌ Error fetching recommendations:", err);
      set({
        error:
          err.response?.data?.detail ||
          "Failed to fetch recommendations from Supabase or backend",
        loading: false,
      });
    }
  },

  // ======================================================
  // 💾 SAVE RECOMMENDATIONS
  // ======================================================
  saveRecommendations: async (userId) => {
    const { recommendations } = get();

    if (!userId) {
      console.error("❌ Missing userId for saving recommendations");
      return;
    }

    if (!recommendations || recommendations.length === 0) {
      console.warn("⚠ No recommendations to save");
      return;
    }

    try {
      const inserts = recommendations.map((rec) => ({
        user_id: userId,
        program_id: rec.program_id,
        similarity_score: rec.similarity_score || null,
      }));

      const { data, error } = await supabase
        .from("user_recommendations")
        .upsert(inserts, { onConflict: ["user_id", "program_id"] });

      if (error) throw error;

      // console.log("✅ Recommendations saved/updated:", data);
    } catch (err) {
      console.error("❌ Error saving recommendations:", err);
    }
  },

  // ======================================================
  // 📊 STATS UPDATE
  // ======================================================
  setStats: (stats) =>
    set((state) => ({
      stats: { ...state.stats, ...stats },
    })),
}));


