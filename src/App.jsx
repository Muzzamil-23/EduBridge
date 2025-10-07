// import { useState } from 'react'
// import HeroSection from './components/HeroSection'
// import Navbar from './components/layout/Navbar'
// import ExploreUniversities from './pages/ExploreUniversities'
// import UniDetails from './pages/UniDetails'


// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <main>
//         <Navbar/>
//         <HeroSection/>
//         {/* <ExploreUniversities/> */}
//         {/* <UniDetails/> */}
//       </main>
//     </>
//   )
// }

// export default App


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

