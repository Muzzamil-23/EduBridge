// // import { create } from "zustand";
// // import axios from "axios";
// // import { useUniversityStore } from "./useUniversityStore";
// // import universityService from "../supabase/univeristyService";

// // const API_BASE = import.meta.env.VITE_API_URL;

// // export const useDashboardStore = create((set, get) => ({
// //   recommendations: [],
// //   loading: false,
// //   error: null,

// //   stats: {
// //     savedUniversities: 0,
// //     totalSearches: 0,
// //     recommendedCount: 0,
// //   },

// //   fetchRecommendations: async (userId) => {
// //     if (!userId) {
// //       console.error("❌ Missing userId for recommendations request");
// //       set({ error: "User ID not provided" });
// //       return;
// //     }

// //     set({ loading: true, error: null });

// //     try {
// //       // 1️⃣ Fetch recommendations from backend
// //       const response = await axios.post(
// //         `${API_BASE}/recommendations/from_supabase`,
// //         { user_id: userId },
// //         { headers: { "Content-Type": "application/json" } }
// //       );

// //       const recs = response.data || [];

// //       // 2️⃣ Map recommendations to include uni_id & program_id
// //       const { universities } = useUniversityStore.getState();

// //       const mappedRecs = await Promise.all(
// //         recs.map(async (rec) => {
// //           // Find the university
// //           const uni = universities.find(
// //             (u) => u.university_name?.trim() === rec.University?.trim()
// //           );

// //           // Lazy-load programs if not already loaded
// //           if (uni && !uni.programs) {
// //             const fullUni = await universityService.getUniversityWithPrograms(uni.uni_id);
// //             uni.programs = fullUni.programs || [];
// //           }

// //           // Find the program
// //           const program = uni?.programs?.find(
// //             (p) => p.program_name?.trim() === rec.Program?.trim()
// //           );

// //           return {
// //             ...rec,
// //             uni_id: uni?.uni_id || null,
// //             program_id: program?.id || null,
// //           };
// //         })
// //       );

// //       console.log("Mapped Recommendations:", mappedRecs);

// //       set({
// //         recommendations: mappedRecs,
// //         loading: false,
// //       });
// //     } catch (err) {
// //       console.error("❌ Error fetching recommendations:", err);
// //       set({
// //         error:
// //           err.response?.data?.detail ||
// //           "Failed to fetch recommendations from Supabase",
// //         loading: false,
// //       });
// //     }
// //   },

// //   setStats: (stats) =>
// //     set((state) => ({
// //       stats: { ...state.stats, ...stats },
// //     })),
// // }));


// // working 2 ✅

// // import { create } from "zustand";
// // import axios from "axios";
// // import { useUniversityStore } from "./useUniversityStore";
// // import universityService from "../supabase/univeristyService";
// // import { supabase } from "../supabase/config";

// // const API_BASE = import.meta.env.VITE_API_URL;

// // export const useDashboardStore = create((set, get) => ({
// //   recommendations: [],
// //   loading: false,
// //   error: null,

// //   stats: {
// //     savedUniversities: 0,
// //     totalSearches: 0,
// //     recommendedCount: 0,
// //   },

// //   // 1️⃣ Fetch recommendations from backend and map IDs
// //   fetchRecommendations: async (userId) => {
// //     if (!userId) {
// //       console.error("❌ Missing userId for recommendations request");
// //       set({ error: "User ID not provided" });
// //       return;
// //     }

// //     set({ loading: true, error: null });

// //     try {
// //       const response = await axios.post(
// //         `${API_BASE}/recommendations/from_supabase`,
// //         { user_id: userId },
// //         { headers: { "Content-Type": "application/json" } }
// //       );

// //       const recs = response.data || [];

// //       const { universities } = useUniversityStore.getState();

// //       console.log("✅ Universities in store:", universities);


// //       const mappedRecs = await Promise.all(
// //         recs.map(async (rec) => {
// //           const uni = universities.find(
// //             (u) => u.university_name?.trim() === rec.University?.trim()
// //           );

// //           if (uni && !uni.programs) {
// //             const fullUni = await universityService.getUniversityWithPrograms(uni.uni_id);
// //             uni.programs = fullUni.programs || [];
// //             console.log("📦 Loaded programs for", uni.university_name, uni.programs);
// //           }




// //           const program = uni?.programs?.find(
// //             (p) => p.program_name?.trim().toLowerCase() === rec.Program?.trim().toLowerCase()
// //           );

// //           if (!program) {
// //             console.warn("⚠ Program not matched:", {
// //               recProgram: rec.Program,
// //               uniPrograms: uni?.programs?.map(p => p.program_name),
// //               uniName: uni?.university_name
// //             });
// //           }

// //           if (!program) {
// //             console.warn("⚠ Program not matched:", {
// //               recProgram: rec.Program,
// //               uniPrograms: uni?.programs?.map(p => p.program_name), // This is helpful for debugging
// //               uniName: uni?.university_name // This is also helpful for debugging
// //             });
// //           }

// //           return {
// //             ...rec,
// //             uni_id: uni?.uni_id || null,
// //             program_id: program?.id || null,
// //           };
// //         })
// //       );

// //       console.log("Mapped Recommendations:", mappedRecs);

// //       set({ recommendations: mappedRecs, loading: false });

// //       // 2️⃣ Automatically save recommendations to Supabase
// //       await get().saveRecommendations(userId);

// //     } catch (err) {
// //       console.error("❌ Error fetching recommendations:", err);
// //       set({
// //         error:
// //           err.response?.data?.detail ||
// //           "Failed to fetch recommendations from Supabase",
// //         loading: false,
// //       });
// //     }
// //   },

// //   // 3️⃣ Save recommendations directly to Supabase
// //   saveRecommendations: async (userId) => {
// //     const { recommendations } = get();

// //     if (!userId) {
// //       console.error("❌ Missing userId for saving recommendations");
// //       return;
// //     }

// //     if (!recommendations || recommendations.length === 0) {
// //       console.warn("⚠ No recommendations to save");
// //       return;
// //     }

// //     try {
// //       const inserts = recommendations.map((rec) => ({
// //         user_id: userId,
// //         program_id: rec.program_id,
// //         similarity_score: rec.similarity_score || null,
// //       }));

// //       const { data, error } = await supabase
// //         .from("user_recommendations")
// //         .upsert(inserts, { onConflict: ["user_id", "program_id"] });

// //       if (error) throw error;

// //       console.log("✅ Recommendations saved/updated:", data);
// //     } catch (err) {
// //       console.error("❌ Error saving recommendations:", err);
// //     }
// //   },

// //   setStats: (stats) =>
// //     set((state) => ({
// //       stats: { ...state.stats, ...stats },
// //     })),
// // }));









// import { create } from "zustand";
// import axios from "axios";
// import { useUniversityStore } from "./useUniversityStore";
// import universityService from "../supabase/univeristyService";
// import { supabase } from "../supabase/config";
// import stringSimilarity from "string-similarity";

// const API_BASE = import.meta.env.VITE_API_URL;

// export const useDashboardStore = create((set, get) => ({
//   recommendations: [],
//   loading: false,
//   error: null,

//   stats: {
//     savedUniversities: 0,
//     totalSearches: 0,
//     recommendedCount: 0,
//   },

//   // fetchRecommendations: async (userId) => {
//   //   if (!userId) {
//   //     console.error("❌ Missing userId for recommendations request");
//   //     set({ error: "User ID not provided" });
//   //     return;
//   //   }

//   //   set({ loading: true, error: null });

//   //   const normalize = (str) =>
//   //     str?.trim().toLowerCase().replace(/\s+/g, ""); // removes spaces and lowercases

//   //   try {
//   //     // 1️⃣ Fetch recommendations from backend
//   //     const response = await axios.post(
//   //       `${API_BASE}/recommendations/from_supabase`,
//   //       { user_id: userId },
//   //       { headers: { "Content-Type": "application/json" } }
//   //     );

//   //     const recs = response.data || [];
//   //     const { universities } = useUniversityStore.getState();

//   //     console.log(
//   //       "✅ Universities in store:",
//   //       universities.map((u) => u.university_name)
//   //     );

//   //     // 2️⃣ Map recommendations
//   //     const mappedRecs = await Promise.all(
//   //       recs.map(async (rec) => {
//   //         // --- Fuzzy match university ---
//   //         const uni = universities.find((u) => {
//   //           const score = stringSimilarity.compareTwoStrings(
//   //             normalize(u.university_name),
//   //             normalize(rec.University)
//   //           );
//   //           return score > 0.85; // adjust threshold if needed
//   //         });

//   //         if (!uni) {
//   //           console.warn("⚠ University not matched:", rec.University);
//   //           return { ...rec, uni_id: null, program_id: null };
//   //         }

//   //         // --- Lazy-load programs if needed ---
//   //         if (!uni.programs || uni.programs.length === 0) {
//   //           const fullUni = await universityService.getUniversityWithPrograms(
//   //             uni.uni_id
//   //           );
//   //           uni.programs = fullUni.programs || [];
//   //           console.log(
//   //             "📦 Loaded programs for",
//   //             uni.university_name,
//   //             uni.programs.map((p) => p.program_name)
//   //           );
//   //         }

//   //         // --- Normalize + fuzzy match programs ---
//   //         const program =
//   //           uni.programs.find((p) => {
//   //             const score = stringSimilarity.compareTwoStrings(
//   //               normalize(p.program_name),
//   //               normalize(rec.Program)
//   //             );
//   //             return score > 0.85;
//   //           }) || null;

//   //         if (!program) {
//   //           console.warn("⚠ Program not matched:", {
//   //             recProgram: rec.Program,
//   //             uniPrograms: uni.programs.map((p) => p.program_name),
//   //             uniName: uni.university_name,
//   //           });
//   //         }

//   //         return {
//   //           ...rec,
//   //           uni_id: uni.uni_id,
//   //           program_id: program?.id || null,
//   //         };
//   //       })
//   //     );

//   //     console.log("Mapped Recommendations:", mappedRecs);

//   //     set({ recommendations: mappedRecs, loading: false });

//   //     // 3️⃣ Save recommendations
//   //     await get().saveRecommendations(userId);
//   //   } catch (err) {
//   //     console.error("❌ Error fetching recommendations:", err);
//   //     set({
//   //       error:
//   //         err.response?.data?.detail || "Failed to fetch recommendations from Supabase",
//   //       loading: false,
//   //     });
//   //   }
//   // },

//   fetchRecommendations: async (userId) => {
//     if (!userId) {
//       console.error("❌ Missing userId for recommendations request");
//       set({ error: "User ID not provided" });
//       return;
//     }

//     set({ loading: true, error: null });

//     try {
//       const { universities } = useUniversityStore.getState();

//       // 1️⃣ Check if recommendations already exist in Supabase
//       const { data: existingRecs, error: existingError } = await supabase
//         .from("user_recommendations")
//         .select("*, programs(program_name, university_id)")
//         .eq("user_id", userId);

//       if (existingError) throw existingError;

//       if (existingRecs && existingRecs.length > 0) {
//         console.log("✅ Loaded recommendations from Supabase cache:", existingRecs);

//         // Map existing records with uni_id and program_id directly
//         const mappedExisting = existingRecs.map((rec) => ({
//           ...rec,
//           uni_id: rec.programs?.university_id || null,
//           program_id: rec.program_id,
//         }));

//         set({ recommendations: mappedExisting, loading: false });
//         return; // ✅ Stop here — don’t hit backend again
//       }

//       // 2️⃣ Otherwise, fetch fresh ones from backend
//       console.log("🌐 No cached recs — fetching from backend...");
//       const response = await axios.post(
//         `${API_BASE}/recommendations/from_supabase`,
//         { user_id: userId },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       const recs = response.data || [];
//       const normalize = (s) => s?.trim().toLowerCase().replace(/\s+/g, "");

//       const mappedRecs = await Promise.all(
//         recs.map(async (rec) => {
//           const uni = universities.find((u) =>
//             stringSimilarity.compareTwoStrings(
//               normalize(u.university_name),
//               normalize(rec.University)
//             ) > 0.85
//           );

//           if (!uni) return { ...rec, uni_id: null, program_id: null };

//           if (!uni.programs || uni.programs.length === 0) {
//             const fullUni = await universityService.getUniversityWithPrograms(uni.uni_id);
//             uni.programs = fullUni.programs || [];
//           }

//           const program =
//             uni.programs.find((p) =>
//               stringSimilarity.compareTwoStrings(
//                 normalize(p.program_name),
//                 normalize(rec.Program)
//               ) > 0.85
//             ) || null;

//           return {
//             ...rec,
//             uni_id: uni.uni_id,
//             program_id: program?.id || null,
//           };
//         })
//       );

//       set({ recommendations: mappedRecs, loading: false });

//       // 3️⃣ Save them for next time
//       await get().saveRecommendations(userId);
//     } catch (err) {
//       console.error("❌ Error fetching recommendations:", err);
//       set({
//         error:
//           err.response?.data?.detail ||
//           "Failed to fetch recommendations from Supabase",
//         loading: false,
//       });
//     }
//   },

//   saveRecommendations: async (userId) => {
//     const { recommendations } = get();

//     if (!userId) {
//       console.error("❌ Missing userId for saving recommendations");
//       return;
//     }

//     if (!recommendations || recommendations.length === 0) {
//       console.warn("⚠ No recommendations to save");
//       return;
//     }

//     try {
//       const inserts = recommendations.map((rec) => ({
//         user_id: userId,
//         program_id: rec.program_id,
//         similarity_score: rec.similarity_score || null,
//       }));

//       const { data, error } = await supabase
//         .from("user_recommendations")
//         .upsert(inserts, { onConflict: ["user_id", "program_id"] });

//       if (error) throw error;

//       console.log("✅ Recommendations saved/updated:", data);
//     } catch (err) {
//       console.error("❌ Error saving recommendations:", err);
//     }
//   },

//   setStats: (stats) =>
//     set((state) => ({
//       stats: { ...state.stats, ...stats },
//     })),
// }));







// test ✅


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
      console.log("⚡ Using cached recommendations from Zustand store");
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
        console.log("✅ Loaded recommendations (joined) from Supabase:", data);
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

      console.log("🧭 Final mapped recommendations:", mappedRecs);
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

      console.log("✅ Recommendations saved/updated:", data);
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


