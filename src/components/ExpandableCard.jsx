import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { MousePointerClick } from "lucide-react";

export default function ExpandableCard({ programs = [] }) {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const uid = useId();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") setActive(null);
    }
    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      {/* Expanded Card */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.div
              layoutId={`card-${active.id}-${uid}`}
              ref={ref}
              className="w-full max-w-[500px] bg-white sm:rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1 bg-[#a77cf3] px-4 py-4 rounded-2xl">
                    <motion.h3
                      layoutId={`title-${active.id}-${uid}`}
                      className="font-bold text-white text-2xl"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.id}-${uid}`}
                      className="text-white mt-2"
                    >
                      Undergraduate
                    </motion.p>
                  </div>
                </div>

                {/* Program Features Section */}
                {active.features && (
                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <h4 className="text-lg font-semibold text-gray-800">
                      Program Details
                    </h4>
                    <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                      <p>
                        <span className="font-bold">Credit Hours:</span>{" "}
                        {active.features.credit_hours}
                      </p>
                      <p>
                        <span className="font-bold">Fee / Credit Hr:</span>{" "}
                        Rs {active.features.fee_per_credit_hr}
                      </p>
                      <p>
                        <span className="font-bold">Semester Fee:</span>{" "}
                        Rs {active.features.semester_fee}
                      </p>
                      <p>
                        <span className="font-bold">Admission Fee:</span>{" "}
                        Rs {active.features.admission_fee}
                      </p>
                      <p>
                        <span className="font-bold">Entry Test Required:</span>{" "}
                        {active.features.entry_test_required ? "Yes" : "No"}
                      </p>
                      <p>
                        <span className="font-bold">Min Academic %:</span>{" "}
                        {active.features.min_academic_percent * 100}%
                      </p>
                      <p>
                        <span className="font-bold">Min Test Score:</span>{" "}
                        {active.features.min_test_score * 100}%
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cards Grid */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {programs.map((card) => {
          const isActive = active?.id === card.id;
          const feature = card.university_program_features?.[0];

          return (
            <motion.div
              key={`card-${card.id}`}
              layoutId={`card-${card.id}-${uid}`}
              onClick={() =>
                setActive({
                  id: card.id,
                  title: card.program_name,
                  features: feature,
                })
              }
              style={{ opacity: isActive ? 0 : 1 }}
              className="p-4 bg-white hover:bg-gray-50 rounded-xl cursor-pointer border border-gray-200 hover:shadow-md transition-shadow flex justify-between"
            >
              <motion.div>
                <motion.h3
                  layoutId={`title-${card.id}-${uid}`}
                  className="font-semibold text-lg text-gray-800 mb-2"
                >
                  {card.program_name}
                </motion.h3>
                <motion.span
                  layoutId={`description-${card.id}-${uid}`}
                  className="text-white text-sm bg-[#B692F6] px-2 py-1 rounded-2xl"
                >
                  Undergraduate
                </motion.span>
              </motion.div>
              <motion.div className="flex items-center gap-4">
                <MousePointerClick size={32} className="text-purple-500" />
                <motion.p className="text-gray-600 text-sm">
                  Click to see details
                </motion.p>
              </motion.div>
            </motion.div>
          );
        })}
      </ul>
    </>
  );
}
