// // import React from 'react';
// // import { useDashboardStore } from '../../store/useDashboardStore';
// // import ExpandableCard from '../ExpandableCard';

// // const Recommendations = ({ limit = 4 }) => {
// //   const { recommendations } = useDashboardStore();

// //   // Limit recommendations
// //   const previewRecs = recommendations?.slice(0, limit) || [];

// //   return (
// //     <section>
// //       <h2 className="text-xl font-semibold mb-4">Recommended Universities</h2>
// //       <div className="bg-[#daf6c0] p-6 rounded-2xl max-h-[500px] overflow-y-auto grid grid-cols-2 gap-4 w-full">
// //         {previewRecs.length > 0 ? (
// //           previewRecs.map((rec) => (
// //             <div key={rec.id} className="w-full">
// //               <ExpandableCard programs={[rec.programs]} />
// //             </div>
// //           ))
// //         ) : (
// //           <p className="text-gray-500 col-span-2">No recommendations yet.</p>
// //         )}
// //       </div>
// //     </section>
// //   );
// // };

// // export default Recommendations;


// import React from 'react';
// import { useDashboardStore } from '../../store/useDashboardStore';
// import ExpandableCard from '../ExpandableCard';

// const Recommendations = ({ limit = 4 }) => {
//   const { recommendations } = useDashboardStore();

//   // Flatten programs and attach university name
//   const previewPrograms =
//     recommendations
//       ?.slice(0, limit)
//       .map((rec) => {
//         if (!rec.programs) return null;
//         const program = rec.programs;
//         return {
//           ...program,
//           university_name: program.universities?.university_name || "Unknown University",
//         };
//       })
//       .filter(Boolean) || [];

//   return (
//     <section>
//       <h2 className="text-xl font-semibold mb-4">✨ Recommended Universities</h2>
//       <div className="bg-[#daf6c0] p-6 rounded-2xl max-h-[500px] overflow-y-auto">
//         {previewPrograms.length > 0 ? (
//           <ExpandableCard programs={previewPrograms} />
//         ) : (
//           <p className="text-gray-500">No recommendations yet.</p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Recommendations;


import React from 'react';
import { useDashboardStore } from '../../store/useDashboardStore';
import ExpandableCard from '../ExpandableCard';
import { useNavigate } from "react-router-dom";
import { ArrowRight } from 'lucide-react';

const Recommendations = ({ limit = 4 }) => {
  const { recommendations } = useDashboardStore();
  const navigate = useNavigate();

  const previewPrograms =
    recommendations
      ?.slice(0, limit)
      .map((rec) => {
        if (!rec.programs) return null;
        const program = rec.programs;
        return {
          ...program,
          university_name: program.universities?.university_name || "Unknown University",
          similarity_score: rec.similarity_score,
        };
      })
      .filter(Boolean) || [];

  return (
    <section>
      <div className='flex items-center gap-2 mb-4'>
        <img src="https://img.icons8.com/?size=100&id=63765&format=png&color=000000" alt="icon" className='w-10 h-10' />
        <h2 className="text-xl font-semibold">Your Top Matches</h2>
      </div>
      <div className="bg-[#daf6c0] p-6 pt-3 rounded-2xl max-h-[500px] overflow-y-auto">
        {recommendations.length > limit && (
          <div className='flex justify-end mb-2'>
            {/* <button
              onClick={() => navigate("/dashboard/recommendations")}

            >
              See All
            </button> */}
            <button
              className="group flex items-center gap-1 cursor-pointer"
              onClick={() => navigate("/student-dashboard/recommendations")}
            >
              <span>See All</span>
              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
            </button>
          </div>
        )}
        {previewPrograms.length > 0 ? (
          <>
            <ExpandableCard programs={previewPrograms} showMatchingScore={true} />
          </>
        ) : (
          <p className="text-gray-500">No recommendations yet.</p>
        )}
      </div>
    </section>
  );
};

export default Recommendations
