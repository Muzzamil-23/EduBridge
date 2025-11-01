import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { useUniversityStore } from "./store/useUniversityStore";
import { useDashboardStore } from "./store/useDashboardStore";
import Loader from "./components/Loader";

function App() {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const user = useAuthStore((state) => state.user);
  const authLoading = useAuthStore((state) => state.loading);

  const fetchUniversities = useUniversityStore((state) => state.fetchUniversities);
  const universities = useUniversityStore((state) => state.universities);

  const fetchRecommendations = useDashboardStore((state) => state.fetchRecommendations);
  const recommendations = useDashboardStore((state) => state.recommendations);
  const recError = useDashboardStore((state) => state.error);

  const location = useLocation();

  // 1️⃣ Fetch user session on app load
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // 2️⃣ Fetch all universities once
  useEffect(() => {
    fetchUniversities();
  }, [fetchUniversities]);

  // 3️⃣ Load recommendations — only once
  // useEffect(() => {
  //   const loadRecommendations = async () => {
  //     if (!user?.id || universities.length === 0) return;

  //     // ✅ Check if already in Zustand store
  //     if (recommendations.length > 0) {
  //       console.log("✅ Recommendations already loaded in store, skipping backend fetch.");
  //       return;
  //     }

  //     // ✅ Try loading from Supabase (user_recommendations table)
  //     const { data, error } = await supabase
  //       .from("user_recommendations")
  //       .select("*")
  //       .eq("user_id", user.id);

  //     if (error) {
  //       console.error("❌ Error fetching from Supabase:", error.message);
  //       return;
  //     }

  //     if (data && data.length > 0) {
  //       console.log("✅ Loaded recommendations from Supabase cache.");
  //       useDashboardStore.setState({ recommendations: data });
  //     } else {
  //       console.log("📡 No cached recommendations, fetching from backend...");
  //       fetchRecommendations(user.id);
  //     }
  //   };

  //   loadRecommendations();
  // }, [user?.id, universities.length]);

  // 3️⃣ Load recommendations — only once
  useEffect(() => {
    const loadRecommendations = async () => {
      if (!user?.id || universities.length === 0) return;

      // ✅ Check if already in Zustand store
      if (recommendations.length > 0) {
        console.log("✅ Recommendations already loaded in store, skipping backend fetch.");
        return;
      }

      // ✅ Just call the store's fetchRecommendations - it handles everything
      console.log("📡 Fetching recommendations via store...");
      await fetchRecommendations(user.id);
    };

    loadRecommendations();
  }, [user?.id, universities.length, recommendations.length, fetchRecommendations]);

  // 4️⃣ Debug logger
  useEffect(() => {
    // console.log("🧩 Recommendations in store:", recommendations);
    if (recError) console.error("Error fetching recommendations:", recError);
  }, [recommendations, recError]);

  const hideNavbar = ["/login", "/signup", "/student-dashboard", "/complete-profile", "/student-dashboard/recommendations", "/student-dashboard/profile", "/student-dashboard/scholarships"].includes(
    location.pathname
  );

  if (authLoading)
    return (
      <div className="min-h-screen bg-background">
        <Loader />
      </div>
    );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!hideNavbar && <Navbar />}
      <Outlet />
    </div>
  );
}

export default App;
