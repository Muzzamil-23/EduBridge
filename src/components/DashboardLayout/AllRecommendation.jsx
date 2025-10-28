// AllRecommendations.jsx
import React from 'react';
import { useDashboardStore } from '../../store/useDashboardStore';
import ExpandableCard from '../ExpandableCard';

const AllRecommendations = () => {
  const { recommendations } = useDashboardStore();

  // Flatten programs and attach university name
  const allPrograms = recommendations?.map((rec) => {
    if (!rec.programs) return null;
    const program = rec.programs;
    return {
      ...program,
      university_name: program.universities?.university_name || "Unknown University",
      similarity_score: rec.similarity_score,
    };
  }).filter(Boolean) || [];

  return (
    <section className="p-6 bg-[#DAF6C0] rounded-2xl mt-4">
        <div className='flex items-center gap-4 mb-6'>
            <img src="https://img.icons8.com/?size=100&id=p3miLroKw4iR&format=png&color=000000" alt="search-icon"  className='w-10 h-10' />
            <h2 className="text-2xl font-bold">All Recommended Programs</h2>
        </div>
      {allPrograms.length > 0 ? (
        <ExpandableCard programs={allPrograms} showMatchingScore={true} />
      ) : (
        <p className="text-gray-500">No recommendations available.</p>
      )}
    </section>
  );
};

export default AllRecommendations;
