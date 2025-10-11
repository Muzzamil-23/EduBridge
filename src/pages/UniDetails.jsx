// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

// const UniDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // Dummy university data
//   const universities = [
//     {
//       id: 1,
//       name: "Hamdard University",
//       city: "Karachi",
//       country: "Pakistan",
//       description:
//         "Hamdard University is one of Pakistan’s most established private institutions, known for excellence in medical, engineering, and business education. With modern laboratories, research centers, and a green campus, it provides a vibrant academic experience.",
//       image_url:
//         "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=60",
//       programs: [
//         { name: "Bachelor of Dental Surgery (BDS)", duration: "4 years", fee: "PKR 1,200,000" },
//         { name: "BS Computer Science", duration: "4 years", fee: "PKR 450,000" },
//         { name: "BBA", duration: "4 years", fee: "PKR 400,000" },
//       ],
//     },
//     {
//       id: 2,
//       name: "Aga Khan University",
//       city: "Karachi",
//       country: "Pakistan",
//       description:
//         "Aga Khan University (AKU) is an internationally recognized institution offering programs in medicine, nursing, and education. Its commitment to community health and global standards of research make it a top-tier choice for higher education.",
//       image_url:
//         "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60",
//       programs: [
//         { name: "MBBS", duration: "5 years", fee: "PKR 1,800,000" },
//         { name: "BS Nursing", duration: "4 years", fee: "PKR 600,000" },
//       ],
//     },
//     {
//       id: 3,
//       name: "National University of Sciences and Technology (NUST)",
//       city: "Islamabad",
//       country: "Pakistan",
//       description:
//         "NUST is Pakistan’s leading science and technology university. It is home to innovation and entrepreneurship programs, fostering leaders in AI, engineering, and software development.",
//       image_url:
//         "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=800&q=60",
//       programs: [
//         { name: "BS Artificial Intelligence", duration: "4 years", fee: "PKR 550,000" },
//         { name: "BS Electrical Engineering", duration: "4 years", fee: "PKR 500,000" },
//         { name: "MS Data Science", duration: "2 years", fee: "PKR 400,000" },
//       ],
//     },
//   ];

//   const university = 1;

//   if (!university) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500">
//         <p>University not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[var(--background)] pt-24 px-6 md:px-16 transition-all duration-300">
//       <div className="max-w-6xl mx-auto">
//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-gray-600 hover:text-[hsl(var(--neon-cyan))] transition-colors mb-6"
//         >
//           <ArrowLeft size={18} /> Back
//         </button>

//         {/* Header Section */}
//         <div className="card overflow-hidden border border-[hsl(var(--border))] flex flex-col md:flex-row hover-float">
//           <img
//             src={university.image_url}
//             alt={university.name}
//             className="md:w-1/2 h-64 md:h-auto object-cover"
//           />
//           <div className="p-6 flex flex-col justify-center">
//             <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
//               {university.name}
//             </h1>
//             <p className="text-gray-500 mb-2">
//               {university.city}, {university.country}
//             </p>
//             <p className="text-gray-600 leading-relaxed">
//               {university.description}
//             </p>
//           </div>
//         </div>

//         {/* Programs Section */}
//         <div className="mt-12">
//           <h2 className="text-2xl font-semibold mb-6 text-[hsl(var(--neon-lime))]">
//             Offered Programs
//           </h2>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {university.programs.map((program, idx) => (
//               <div
//                 key={idx}
//                 className="p-5 rounded-2xl border border-[hsl(var(--border))] bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
//               >
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                   {program.name}
//                 </h3>
//                 <p className="text-sm text-gray-600">Duration: {program.duration}</p>
//                 <p className="text-sm text-gray-600">Fee: {program.fee}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Apply Section */}
//         <div className="mt-16 text-center">
//           <h3 className="text-xl font-semibold mb-3 text-gray-700">
//             Ready to start your journey?
//           </h3>
//           <button className="btn-primary px-6 py-2 rounded-lg hover:shadow-md">
//             Apply Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UniDetails;





import { MapPin, Globe, Mail, Phone, GraduationCap, Building2, Calendar, Award, Star } from "lucide-react";

const UniDetails = () => {
  const neon = {
    purple: "hsl(var(--neon-purple))",
    cyan: "hsl(var(--neon-cyan))",
    pink: "hsl(var(--neon-pink))",
    lime: "hsl(var(--neon-lime))",
    orange: "hsl(var(--neon-orange))"
  };

  const programs = [
    { level: "Undergraduate", name: "BSc Computer Science", duration: "4 years", fee: "$56,169/year" },
    { level: "Undergraduate", name: "B.Eng", duration: "4 years", fee: "$56,169/year" },
    { level: "Graduate", name: "MBA", duration: "2 years", fee: "$77,868/year" },
    { level: "Graduate", name: "MS Data Science", duration: "2 years", fee: "$58,746/year" },
  ];

  const reviews = [
    { name: "Sarah Johnson", date: "2 months ago", rating: 5, text: "Exceptional academic environment with world-class faculty and resources." },
    { name: "Michael Chen", date: "3 months ago", rating: 5, text: "The entrepreneurial culture and Silicon Valley connections are unmatched." },
    { name: "Emily Rodriguez", date: "4 months ago", rating: 4, text: "Great programs but very competitive. The campus is beautiful and facilities are top-notch." },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar Placeholder */}
      {/* <aside className="hidden md:flex flex-col w-64 bg-gray-50 border-r">
        <div className="p-6 font-semibold text-xl">EduBridge</div>
        <nav className="flex-1 px-4 space-y-3">
          <a className="block text-gray-700 hover:text-black">🏠 Dashboard</a>
          <a className="block text-gray-700 hover:text-black">🎓 Explore</a>
          <a className="block text-gray-700 hover:text-black">📊 Insights</a>
          <a className="block text-gray-700 hover:text-black">⚙️ Settings</a>
        </nav>
      </aside> */}

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6 mt-20">
        {/* Header */}
        <div className="flex gap-8 rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="w-[40%]">
            <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60" className="rounded-xl" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="lg:text-4xl md:text-3xl text-2xl font-extrabold">Stanford University</h1>
            <div className="flex items-center text-gray-600 rounded-2xl py-1 pl-1 mt-1">
              <div className="flex items-center bg-[hsl(var(--neon-cyan))] px-4 py-1 rounded-2xl">
                <MapPin size={16} className="mr-1" /> Stanford, California, USA
              </div>
            </div>
            <p className="italic text-sm text-purple-800 font-bold mt-2">
              Leading the way in innovation and research excellence
            </p>
            <p className="text-gray-700 mt-3 text-md">
              Stanford University is a world-leading research university located in the heart of Silicon Valley. Known for its entrepreneurial spirit and cutting-edge research, Stanford offers exceptional programs across all disciplines.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap gap-6 rounded-2xl border border-gray-200 p-6 shadow-sm">
          <section className="lg:w-[80%] w-full bg-[#E3FBCC] p-6 rounded-2xl">
            <h2 className="text-xl font-extrabold mb-3">Programs Offered</h2>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
              {programs.map((p, i) => (
                <div key={i} className="rounded-xl p-4 shadow-sm bg-white/60 hover:shadow-md transition">
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[#c8f59e]/80">{p.level}</span>
                  <h3 className="font-bold text-lg mt-2 text-gray-800">{p.name}</h3>
                  <p className="text-sm text-gray-600">Duration: {p.duration}</p>
                  <p className="text-sm font-medium mt-1 text-blue-600">{p.fee}</p>
                </div>
              ))}
            </div>
          </section>
          {/* Overview */}
          <section className="bg-[hsl(var(--neon-purple))] p-6 rounded-2xl">
            <h2 className="text-xl font-extrabold mb-8 text-purple-950">Overview</h2>
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
              {[
                { icon: <Building2 className="text-purple-700" />, label: "Type", value: "Private Research University" },
                { icon: <Award className="text-purple-700" />, label: "Ranking", value: "#2 Global University" },
                { icon: <Calendar className="text-purple-700" />, label: "Established", value: "1885" },
                { icon: <GraduationCap className="text-purple-700" />, label: "Accreditation", value: "WASC Senior College & University Commission" },
              ].map((item, i) => (
                <div key={i} className="rounded-xl p-4 bg-white/60 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    {item.icon}
                    <span className="text-purple-950 font-medium">{item.label}</span>
                  </div>
                  <p className="mt-2 text-gray-800 font-medium text-lg">{item.value}</p>
                </div>
              ))}
            </div>
          </section>
          {/* Programs Offered */}
        </div>


        {/* Fee Structure */}
        <section>
          <h2 className="text-xl font-bold mb-3">Fee Structure</h2>
          <div className="rounded-xl border border-gray-200 p-6 shadow-sm bg-white">
            <div className="space-y-2 text-sm text-gray-700">

              {/* Fee rows */}
              {[
                ["Tuition (Undergraduate)", "$56,169"],
                ["Tuition (Graduate)", "$58,746 – $77,868"],
                ["Room & Board", "$17,255"],
                ["Books & Supplies", "$1,245"],
                ["Personal Expenses", "$2,130"],
              ].map(([label, value], i) => (
                <div key={i} className="flex justify-between items-center py-1">
                  <span className="text-gray-700 text-lg">{label}</span>
                  <span className="font-extrabold text-gray-950 text-lg text-right">{value}</span>
                </div>
              ))}

              {/* Divider */}
              <div className="border-t border-gray-200 my-2"></div>

              {/* Total row */}
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-lg">Total Estimated Cost</span>
                <span className="font-extrabold text-2xl text-blue-600">$76,799</span>
              </div>

            </div>
          </div>
        </section>

        {/* Contact & Apply */}
        <section>
          <h2 className="text-xl font-bold mb-3">Contact & Apply</h2>
          <div className="flex border border-gray-200 p-6 shadow-sm bg-white rounded-2xl">
            <div className="flex items-center rounded-xl w-[70%]">
              <ul className="space-y-5 text-sm text-gray-700">
                <div className="flex items-center">
                  <Mail size={26} className="mr-2 text-blue-500" />
                  <div>
                    <span className="text-gray-500">Email</span>
                    <li className="text-lg font-medium">admissions@stanford.edu</li>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone size={26} className="mr-2 text-blue-500" />
                  <div>
                    <span className="text-gray-500">Phone</span>
                    <li className="text-lg font-medium">+1 (650) 723-2091</li>
                  </div>
                </div>
                <div className="flex items-center">
                  <Globe size={26} className="mr-2 text-blue-500" />
                  <div>
                    <span className="text-gray-500">Website</span>
                    <li className="text-lg font-medium">www.stanford.edu</li>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin size={26} className="mr-2 text-blue-500" />
                  <div>
                    <span className="text-gray-500">Address</span>
                    <li className="text-lg font-medium">450 Serra Mall, Stanford, CA 94305</li>
                  </div>
                </div>
              </ul>
            </div>
            <div className="rounded-xl p-4 flex flex-col justify-center gap-6 w-[30%]">
              <button className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 cursor-pointer">Apply Now</button>
              <button className="flex text-gray-700 justify-center items-center w-full border border-gray-300 py-4 rounded-xl hover:bg-gray-50 cursor-pointer"><Globe size={20} className="mr-2 text-gray-700" /> Visit Website</button>
              <button className="flex text-gray-700 justify-center items-center w-full border border-gray-300 py-4 cursor-pointer rounded-xl hover:bg-gray-50"><MapPin size={20} className="mr-2" />
                View on Map</button>
              <p className="text-green-900 mt-2 text-center bg-[hsl(var(--neon-lime))] py-3 rounded-xl">
                <strong>Application Deadline:</strong> January 5, 2026
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UniDetails;

