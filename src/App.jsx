import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { supabase } from "./supabase/config";
import { useAuthStore
  
 } from "./store/useAuthStore";

function App() {
  supabase.auth.onAuthStateChange((_event, session) => {
    useAuthStore.setState({ user: session?.user || null });
  });
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar/>
      <Outlet /> {/* 👈 this is where Explore, HeroSection, or UniDetails will appear */}
    </div>
  );
}

export default App;

