import { MapPin, Globe, Mail, Phone, GraduationCap, Building2, Calendar, Award, Star, Bus } from "lucide-react";
import { useParams } from "react-router-dom";
import { useUniversityStore } from "../store/useUniversityStore";
import { useEffect } from "react";
import ExpandableCard from "../components/ExpandableCard";
// import { MapPin, Globe, Mail, Phone, GraduationCap, Building2, Calendar, Award, Star, Bus } from "lucide-react";


const UniDetails = () => {
  const { id } = useParams()
  const { selectedUniversities, fetchUniversityDetails, loading, error } = useUniversityStore()




  // useEffect(() => {
  //   if (id) {
  //     fetchUniversityDetails(id)  
  //   }
  // }, [])

  useEffect(() => {
    if (id) {
      fetchUniversityDetails(id)
    }
  }, [])

  console.log(selectedUniversities);


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
      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6 mt-20">
        {/* Header */}
        <div className="flex gap-12 rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="w-auto flex justify-center">
            <img src={selectedUniversities?.logo_url} className="rounded-xl w-[14rem]" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="lg:text-4xl md:text-3xl text-2xl font-extrabold">{selectedUniversities?.university_name}</h1>
            <div className="flex items-center text-gray-600 rounded-2xl py-1 pl-1 mt-1">
              <div className="flex items-center bg-[hsl(var(--neon-cyan))] px-4 py-1 rounded-2xl">
                <MapPin size={16} className="mr-1" /> {selectedUniversities?.city}, Pakistan
              </div>
            </div>
            <p className="italic text-sm text-purple-800 font-bold mt-2">
              Leading the way in innovation and research excellence
            </p>
            <p className="text-gray-700 mt-3 text-md">
              {selectedUniversities?.about}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 p-6 shadow-sm">
          <section className="bg-[#E3FBCC] p-6 rounded-2xl">
            <h2 className="text-xl font-extrabold mb-3">Programs Offered</h2>
            {/* <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
              {selectedUniversities?.programs.map((p, i) => (
                <div key={i} className="rounded-xl p-4 shadow-sm bg-white/60 hover:shadow-md transition">
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[#c8f59e]/80">Undergraduate</span>
                  <h3 className="font-bold text-lg mt-2 text-gray-800">{p?.program_name}</h3>
                  <p className="text-sm font-medium mt-1 text-blue-600">{p.fee}</p>
                </div>
              ))}
            </div> */}
            <ExpandableCard programs={selectedUniversities?.programs || []} />
          </section>
          {/* Overview */}
          {/* <section className="bg-[#ECE1FF] p-6 rounded-2xl">
            <h2 className="text-xl font-extrabold mb-8 text-purple-950">Overview</h2>
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
              {[
                { icon: <Building2 className="text-purple-700" />, label: "Type", value: "Private Research University" },
                { icon: <Award className="text-purple-700" />, label: "Ranking", value: "#2 Global University" },
                { icon: <Calendar className="text-purple-700" />, label: "Established", value: "1885" },
                { icon: <GraduationCap className="text-purple-700" />, label: "Accreditation", value: "WASC Senior College & University Commission" },
              ].map((item, i) => (
                <div key={i} className="rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    {item.icon}
                    <span className="text-purple-950 font-medium">{item.label}</span>
                  </div>
                  <p className="mt-2 text-gray-800 font-medium text-lg">{item.value}</p>
                </div>
              ))}
            </div>
          </section> */}
          <section className="bg-[#ECE1FF] p-6 rounded-2xl">
            <h2 className="text-xl font-extrabold mb-8 text-purple-950">Overview</h2>
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
              {[
                {
                  icon: <Award className="text-purple-700" size={32} />,
                  label: "Accreditations",
                  value: selectedUniversities?.accreditations || "Not specified",
                },
                {
                  icon: <Star className="text-purple-700" size={32} />,
                  label: "Extracurriculars",
                  value: selectedUniversities?.extracurriculars || "Not specified",
                },
                {
                  icon: <Building2 className="text-purple-700" size={32} />,
                  label: "Hostel Facility",
                  value: selectedUniversities?.has_hostel ? "Available" : "Not Available",
                },
                {
                  icon: <Bus className="text-purple-700" size={32} />,
                  label: "Transport Facility",
                  value: selectedUniversities?.has_transport ? "Available" : "Not Available",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
                >
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
        {/* <section>
          <h2 className="text-xl font-bold mb-3">Fee Structure</h2>
          <div className="rounded-xl border border-gray-200 p-6 shadow-sm bg-white">
            <div className="space-y-2 text-sm text-gray-700">

              
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

              
              <div className="border-t border-gray-200 my-2"></div>

              
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-lg">Total Estimated Cost</span>
                <span className="font-extrabold text-2xl text-blue-600">$76,799</span>
              </div>

            </div>
          </div>
        </section> */}

        {/* Contact & Apply */}
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-3">Contact & Apply</h2>
          <div className="flex border border-gray-200 p-6 shadow-sm bg-white rounded-2xl">
            <div className="flex items-center rounded-xl w-[70%]">
              <ul className="space-y-10 text-sm text-gray-700">
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
                    <li className="text-lg font-medium">{selectedUniversities?.contact}</li>
                  </div>
                </div>
                <div className="flex items-center">
                  <Globe size={26} className="mr-2 text-blue-500" />
                  <div>
                    <span className="text-gray-500">Website</span>
                    <li className="text-lg font-medium">{selectedUniversities?.website}</li>
                  </div>
                </div>
                {/* <div className="flex items-center">
                  <MapPin size={26} className="mr-2 text-blue-500" />
                  <div>
                    <span className="text-gray-500">Address</span>
                    <a href={selectedUniversities?.Location} className="text-lg font-medium">{selectedUniversities?.Location}</a>
                  </div>
                </div> */}
              </ul>
            </div>
            <div className="rounded-xl p-4 flex flex-col justify-center gap-6 w-[30%]">
              <a href={selectedUniversities?.Apply} target="_blank" className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 cursor-pointer text-center">Apply Now</a>
              <a href={selectedUniversities?.website} target="_blank" className="flex text-gray-700 text-center justify-center items-center w-full border border-gray-300 py-4 rounded-xl hover:bg-gray-50 cursor-pointer"><Globe size={20} className="mr-2 text-gray-700" /> Visit Website</a>
              <a href={selectedUniversities?.Location} target="_blank" className="flex text-gray-700 justify-center items-center w-full border border-gray-300 py-4 cursor-pointer rounded-xl hover:bg-gray-50"><MapPin size={20} className="mr-2" />
                View on Map</a>
              {/* <p className="text-green-900 mt-2 text-center bg-[hsl(var(--neon-lime))] py-3 rounded-xl">
                <strong>Application Deadline:</strong> January 5, 2026
              </p> */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UniDetails;

