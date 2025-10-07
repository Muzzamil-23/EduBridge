import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const UniDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy university data
  const universities = [
    {
      id: 1,
      name: "Hamdard University",
      city: "Karachi",
      country: "Pakistan",
      description:
        "Hamdard University is one of Pakistan’s most established private institutions, known for excellence in medical, engineering, and business education. With modern laboratories, research centers, and a green campus, it provides a vibrant academic experience.",
      image_url:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=60",
      programs: [
        { name: "Bachelor of Dental Surgery (BDS)", duration: "4 years", fee: "PKR 1,200,000" },
        { name: "BS Computer Science", duration: "4 years", fee: "PKR 450,000" },
        { name: "BBA", duration: "4 years", fee: "PKR 400,000" },
      ],
    },
    {
      id: 2,
      name: "Aga Khan University",
      city: "Karachi",
      country: "Pakistan",
      description:
        "Aga Khan University (AKU) is an internationally recognized institution offering programs in medicine, nursing, and education. Its commitment to community health and global standards of research make it a top-tier choice for higher education.",
      image_url:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60",
      programs: [
        { name: "MBBS", duration: "5 years", fee: "PKR 1,800,000" },
        { name: "BS Nursing", duration: "4 years", fee: "PKR 600,000" },
      ],
    },
    {
      id: 3,
      name: "National University of Sciences and Technology (NUST)",
      city: "Islamabad",
      country: "Pakistan",
      description:
        "NUST is Pakistan’s leading science and technology university. It is home to innovation and entrepreneurship programs, fostering leaders in AI, engineering, and software development.",
      image_url:
        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=800&q=60",
      programs: [
        { name: "BS Artificial Intelligence", duration: "4 years", fee: "PKR 550,000" },
        { name: "BS Electrical Engineering", duration: "4 years", fee: "PKR 500,000" },
        { name: "MS Data Science", duration: "2 years", fee: "PKR 400,000" },
      ],
    },
  ];

  const university = 1;

  if (!university) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        <p>University not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] pt-24 px-6 md:px-16 transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-[hsl(var(--neon-cyan))] transition-colors mb-6"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Header Section */}
        <div className="card overflow-hidden border border-[hsl(var(--border))] flex flex-col md:flex-row hover-float">
          <img
            src={university.image_url}
            alt={university.name}
            className="md:w-1/2 h-64 md:h-auto object-cover"
          />
          <div className="p-6 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
              {university.name}
            </h1>
            <p className="text-gray-500 mb-2">
              {university.city}, {university.country}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {university.description}
            </p>
          </div>
        </div>

        {/* Programs Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-[hsl(var(--neon-lime))]">
            Offered Programs
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {university.programs.map((program, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-[hsl(var(--border))] bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {program.name}
                </h3>
                <p className="text-sm text-gray-600">Duration: {program.duration}</p>
                <p className="text-sm text-gray-600">Fee: {program.fee}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Apply Section */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            Ready to start your journey?
          </h3>
          <button className="btn-primary px-6 py-2 rounded-lg hover:shadow-md">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default UniDetails;
