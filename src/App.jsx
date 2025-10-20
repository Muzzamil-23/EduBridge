import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import Loader from "./components/Loader";

function App() {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const loading = useAuthStore((state) => state.loading);
  const location = useLocation();

  // 🧠 Fetch user session on app load
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Hide Navbar on specific routes
  const hideNavbar = ["/login", "/signup", "/student-dashboard", "/complete-profile"].includes(location.pathname);

  if(loading) return (
    <div className="min-h-screen bg-background">
      <Loader/>
    </div>
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!hideNavbar && <Navbar />}
      <Outlet/>
    </div>
  );
}

export default App;
