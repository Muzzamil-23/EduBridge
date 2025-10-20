import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = ["Home", "Explore", "Pricing", "About", "Contact"];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 px-6 py-4 flex items-center justify-between bg-transparent backdrop-blur-md transition-all duration-300">
      {/* Logo */}
      <div className="text-2xl font-bold cursor-pointer">EduBridge</div>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-8">
        {links.map((link, idx) => (
          <Link
            to={`/${link.toLocaleLowerCase()}`}
            key={idx}
            className="relative cursor-pointer transition-all duration-300 hover:text-blue-600"
          >
            {link}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[hsl(var(--neon-lime))] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </ul>

      {/* Call-to-action */}
      <button className="hidden md:block bg-[var(--btn-primary)] text-white px-4 py-1 rounded-lg cursor-pointer">
        Sign Up
      </button>

      {/* Mobile Menu Button */}
      <div
        className="md:hidden cursor-pointer z-[60] absolute top-5 right-6 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} color="black" /> : <Menu size={28} color="black" />}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center z-50 gap-6 md:hidden transition-all duration-300">
          {links.map((link, idx) => (
            <Link
              to={`/${link.toLocaleLowerCase()}`}
              key={idx}
              className="text-2xl hover:text-blue-600 cursor-pointer transition-colors duration-200"
            >
              {link}
            </Link>
          ))}
          <button className="bg-[var(--btn-primary)] mt-4 text-white px-4 py-1 rounded-lg cursor-pointer">
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;






// import React, { useState } from "react";
// import { Menu, X } from "lucide-react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuthStore } from "../../store/useAuthStore";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { user, logout } = useAuthStore();
//   const location = useLocation();
//   const navigate = useNavigate();

//   // pages where navbar should be hidden
//   const hideNavbarPaths = ["/login", "/signup", "/dashboard"];
//   if (hideNavbarPaths.includes(location.pathname)) return null;

//   const links = [
//     { label: "Home", path: "/" },
//     { label: "Explore", path: "/explore" },
//     { label: "About", path: "/about" },
//     { label: "Contact", path: "/contact" },
//   ];

//   const handleAuthClick = async () => {
//     if (user) {
//       await logout();
//       navigate("/login");
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <nav className="w-full fixed top-0 left-0 z-50 px-6 py-4 flex items-center justify-between bg-white/60 backdrop-blur-md shadow-sm transition-all duration-300">
//       {/* Logo */}
//       <Link
//         to="/"
//         className="text-2xl font-bold text-blue-700 cursor-pointer tracking-tight"
//       >
//         EduBridge
//       </Link>

//       {/* Desktop Links */}
//       <ul className="hidden md:flex gap-8">
//         {links.map((link) => (
//           <Link
//             key={link.path}
//             to={link.path}
//             className={`relative font-medium text-gray-700 hover:text-blue-600 transition-all duration-300`}
//           >
//             {link.label}
//           </Link>
//         ))}
//       </ul>

//       {/* Call-to-action */}
//       <button
//         onClick={handleAuthClick}
//         className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg cursor-pointer transition-all duration-300"
//       >
//         {user ? "Logout" : "Sign Up / Login"}
//       </button>

//       {/* Mobile Menu Button */}
//       <div
//         className="md:hidden cursor-pointer z-[60] absolute top-5 right-6 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {isOpen ? <X size={26} color="black" /> : <Menu size={26} color="black" />}
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center z-50 gap-6 md:hidden transition-all duration-300">
//           {links.map((link) => (
//             <Link
//               to={link.path}
//               key={link.path}
//               className="text-2xl font-semibold text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-200"
//               onClick={() => setIsOpen(false)}
//             >
//               {link.label}
//             </Link>
//           ))}
//           <button
//             onClick={() => {
//               setIsOpen(false);
//               handleAuthClick();
//             }}
//             className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
//           >
//             {user ? "Logout" : "Sign Up / Login"}
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

