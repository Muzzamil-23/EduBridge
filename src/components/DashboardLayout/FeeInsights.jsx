import React from 'react';
import CountUp from 'react-countup';

const FeeInsights = ({ programs = [] }) => {
  if (!programs.length) return null;

  // Flatten nested program arrays and remove any undefined
  const flatPrograms = programs.flat();
  const fees = flatPrograms
    .map(p => p?.university_program_features?.[0]?.semester_fee)
    .filter(f => f !== undefined && f !== null);

  if (!fees.length) return null;

  const minFee = Math.min(...fees);
  const maxFee = Math.max(...fees);
  const avgFee = fees.reduce((acc, f) => acc + f, 0) / fees.length;

  const stats = [
    { label: 'Minimum Fee', value: minFee },
    { label: 'Maximum Fee', value: maxFee },
    { label: 'Average Fee', value: Math.round(avgFee) },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-5 bg-[#cbb1ef] px-6 py-6 rounded-2xl">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="p-6 bg-white rounded-2xl shadow-md flex flex-col items-center"
        >
          <h4 className="text-gray-600 mb-2">{stat.label}</h4>
          <CountUp
            start={0}
            end={stat.value}
            duration={1.5}
            separator=","
            prefix="Rs "
            className="text-2xl font-bold text-purple-700"
          />
        </div>
      ))}
    </div>
  );
};

export default FeeInsights;
