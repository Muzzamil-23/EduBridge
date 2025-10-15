import React, { useEffect } from "react"
import { useUniversityStore } from "../store/useUniversityStore"
import UniCardSkeleton from "../components/UniCardSkeleton"
import UniCard from "../components/UniCard"

const ExploreUniversities = () => {
  const { universities, fetchUniversities, loading, error } = useUniversityStore()
  useEffect(() => {
    fetchUniversities()
  }, [fetchUniversities])

  // ⚠️ Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)] pt-24 px-6 md:px-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-semibold mt-10">
            Explore Universities in <span className="text-[#5E4BEC] font-extrabold">Karachi</span>
          </h1>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Discover Pakistan’s leading universities — compare programs, fees,
            and admission details to find your perfect match.
          </p>
        </div>

        {/* Content */}
        
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* ✅ Loading shimmer skeletons */}
            {loading
              ? Array(6)
                  .fill(null)
                  .map((_, i) => <UniCardSkeleton key={i} />)
              : universities.length > 0
              ? universities.map((uni) => (
                  // <div
                  //   key={uni?.uni_id}
                  //   className="hover-float border border-[hsl(var(--border))] flex flex-col overflow-hidden transition-all duration-300 rounded-xl bg-white/70"
                  // >
                  //   {/* If image_url exists, you can uncomment this later */}
                  //   <img
                  //     src={`https://habib.edu.pk/HU-news/wp-content/uploads/2023/02/Feature-Image-1-700x336.jpg`}
                  //     className="h-48 w-full object-cover rounded-t-xl"
                  //   />

                  //   <div className="flex flex-col flex-1 p-5">
                  //     <h2 className="text-xl font-extrabold text-gray-800 mb-1">
                  //       {uni?.university_name}
                  //     </h2>
                  //     <span className="text-sm text-gray-500 mb-3 inline">
                  //       {uni?.city}, Pakistan
                  //     </span>
                  //     <p>{uni?.about}</p>

                  //     <button
                  //       onClick={() => navigate(`/university/${uni.uni_id}`)}
                  //       className="bg-[hsl(var(--neon-purple))] border border-[hsl(var(--border))] text-purple-800 font-bold py-2 rounded-lg mt-5 hover:shadow-md cursor-pointer"
                  //     >
                  //       View Details
                  //     </button>
                  //   </div>
                  // </div>
                  <UniCard key={uni?.uni_id} uni={uni}/>
                ))
              : (
                <p className="text-gray-500 text-center col-span-full">
                  No universities found.
                </p>
              )}
          </div>
        

        {/* Decorative Accent */}
        <div className="mt-20 text-center">
          <p className="text-sm text-gray-400">
            ✨ Explore your path with <span className="font-semibold">EduBridge</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ExploreUniversities
