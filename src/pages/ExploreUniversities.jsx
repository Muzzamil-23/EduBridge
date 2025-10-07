import React from "react";
import { useNavigate } from "react-router-dom";

const ExploreUniversities = () => {
  const navigate = useNavigate();

  // Dummy university data
  const universities = [
    {
      id: 1,
      name: "Hamdard University",
      city: "Karachi",
      country: "Pakistan",
      description:
        "Leading programs in medicine, engineering, and management sciences with state-of-the-art facilities.",
      image_url:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      name: "Aga Khan University",
      city: "Karachi",
      country: "Pakistan",
      description:
        "Renowned for medical, nursing, and educational excellence with global partnerships.",
      image_url:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "National University of Sciences and Technology (NUST)",
      city: "Islamabad",
      country: "Pakistan",
      description:
        "A hub for innovation, technology, and research excellence in engineering and computer science.",
      image_url:
        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=800&q=60",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] pt-24 px-6 md:px-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-semibold mt-10">
            Explore Top Universities
          </h1>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Discover Pakistan’s leading universities — compare programs, fees, and
            admission details to find the perfect match for your future.
          </p>
        </div>

        <div className="bg-[hsl(var(--neon-lime))] py-20 px-20 rounded-2xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {universities.map((uni) => (
                <div
                key={uni.id}
                className="hover-float border border-[hsl(var(--border))] flex flex-col overflow-hidden transition-all duration-300 rounded-xl bg-white/70"
                >
                <img
                    src={uni.image_url}
                    alt={uni.name}
                    className="h-48 w-full object-cover rounded-t-xl"
                />

                <div className="flex flex-col flex-1 p-5">
                    <h2 className="text-xl font-extrabold text-gray-800 mb-1">
                    {uni.name}
                    </h2>
                    <span className="text-sm text-gray-500 mb-3 inline">
                    {uni.city}, {uni.country}
                    </span>
                    <p className="text-gray-600 text-sm flex-grow leading-relaxed">
                    {uni.description}
                    </p>
                    <button
                    onClick={() => navigate(`/university/${uni.id}`)}
                    className="bg-[hsl(var(--neon-purple))] border border-[hsl(var(--border))] text-purple-800 font-bold py-2 rounded-lg mt-5 hover:shadow-md cursor-pointer"
                    >
                    View Details
                    </button>
                </div>
                </div>
                // #b5ecc7
                // #55a46f
            ))}
            </div>
        </div>


        {/* Decorative Accent */}
        <div className="mt-20 text-center">
          <p className="text-sm text-gray-400">
            ✨ Explore your path with <span className="font-semibold">EduBridge</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExploreUniversities;






