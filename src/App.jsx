import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";


function App() {

  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar/>
      <Outlet /> {/* 👈 this is where Explore, HeroSection, or UniDetails will appear */}
    </div>
  );
}

export default App;

