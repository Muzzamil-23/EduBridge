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
