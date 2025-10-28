import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import profileService from "../supabase/profileService";
import { personalSchema, academicSchema } from "../validations/profileSchema";
import Dropdown from "./Dropdown";
import { useDashboardStore } from "../store/useDashboardStore";

// const { user } = useAuthStore();


const containerVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: "easeIn" } },
};

const CompleteProfile = () => {
  const navigate = useNavigate();
  const { fetchRecommendations } = useDashboardStore();
  useEffect(() => {
    const { isProfileCompleted } = useAuthStore.getState();
    if (isProfileCompleted) {
      localStorage.removeItem("personalData");
      localStorage.removeItem("academicData");
      navigate("/student-dashboard");
    }
  }, [navigate]);

  const { user } = useAuthStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prefilled, setPrefilled] = useState(false);

  // ✅ React Hook Form setups
  const personalForm = useForm({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      age: "",
    },
  });

  const {
    formState: { errors: personalErrors },
  } = personalForm;

  const academicForm = useForm({
    resolver: zodResolver(academicSchema),
    defaultValues: {
      preferred_university_type: "",
      per_semester_budget: "",
      budget_bracket: "",
      preferred_program_group: "",
      scholarship_requirement: false,
      hostel_requirement: false,
      transport_requirement: false,
      entry_test_requirement: false,
      accreditations: "",
      specific_universities: "",
    },
  });

  const {
    watch,
    setValue,
    formState: { errors: academicErrors },
  } = academicForm;

  // ✅ Load localStorage data on mount (keep data even after refresh)
  useEffect(() => {
    const personalData = localStorage.getItem("personalData");
    const academicData = localStorage.getItem("academicData");

    if (personalData) personalForm.reset(JSON.parse(personalData));
    if (academicData) academicForm.reset(JSON.parse(academicData));
  }, [personalForm, academicForm]);

  // ✅ Auto-save to localStorage when form data changes
  useEffect(() => {
    const subscription = personalForm.watch((values) => {
      localStorage.setItem("personalData", JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [personalForm.watch]);

  useEffect(() => {
    const subscription = academicForm.watch((values) => {
      localStorage.setItem("academicData", JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [academicForm.watch]);

  // ✅ Prefill from Supabase (if user has existing data)
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id || prefilled) return;
      setLoading(true);
      try {
        const personal = await profileService.getPersonalData(user.id);
        if (personal) {
          personalForm.reset(personal);
          localStorage.setItem("personalData", JSON.stringify(personal));
        }

        const academic = await profileService.getAcademicData(user.id);
        if (academic) {
          academicForm.reset(academic);
          localStorage.setItem("academicData", JSON.stringify(academic));
        }

        setPrefilled(true);
      } catch (err) {
        console.error("Failed to prefill profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id, prefilled, personalForm, academicForm]);

  // ✅ Handle step navigation
  const handleNext = async () => {
    setError("");
    if (step === 1) {
      const isValid = await personalForm.trigger();
      if (!isValid) return;
      setStep(2);
    } else if (step === 2) {
      const isValid = await academicForm.trigger();
      if (!isValid) return;

      setLoading(true);
      try {
        const personalData = JSON.parse(localStorage.getItem("personalData"));
        const academicData = JSON.parse(localStorage.getItem("academicData"));

        await profileService.upsertPersonalData({ ...personalData, user_id: user.id });
        await profileService.upsertAcademicData({ ...academicData, user_id: user.id });


        useAuthStore.setState({ isProfileCompleted: true });
        localStorage.removeItem("personalData");
        localStorage.removeItem("academicData");
        await fetchRecommendations(user.id)
        navigate("/student-dashboard");

      } catch (err) {
        console.error("❌ Submission error:", err);
        setError(err.message || "Failed to complete profile.");
      } finally {
        localStorage.removeItem("personalData");
        localStorage.removeItem("academicData");
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const progressPercent = step === 1 ? 50 : 100;

  const universityTypes = ["Public", "Private"];

  const budgetBrackets = [
    "Below 50,000 PKR",
    "50,000 – 100,000 PKR",
    "100,000 – 200,000 PKR",
    "200,000 – 300,000 PKR",
    "Above 300,000 PKR",
  ];

  const programGroups = [
    "Engineering & Technology",
    "Computer Science / IT",
    "Business & Management",
    "Medical & Health Sciences",
    "Arts & Humanities",
    "Law & Legal Studies",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 mt-6">
      <div className="w-full max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900">Complete Your Profile</h2>
          <p className="mt-3 text-gray-600">
            Just 2 quick steps <span className="text-2xl">✨</span>
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="px-8 py-6 flex justify-between items-center">
            <div>
              <p className="text-blue-600 font-bold">Step {step} of 2</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {step === 1 ? "Personal Information" : "Academic Preferences"}
              </p>
            </div>

            <div>
              <p className="text-blue-600 font-bold">Progress</p>
              <div className="mt-2 w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-2 bg-green-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="mx-8 mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>
          )}

          <div className="p-8">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div key="personal" variants={containerVariants} initial="enter" animate="center" exit="exit">
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <input
                        {...personalForm.register("first_name")}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2"
                        placeholder="John"
                      />
                      {
                        personalErrors.first_name && (
                          <p className="text-red-500 text-sm mt-1">{personalErrors.first_name.message}</p>
                        )
                      }

                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <input
                        {...personalForm.register("last_name")}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2"
                        placeholder="Doe"
                      />
                      {
                        personalErrors.last_name && (
                          <p className="text-red-500 text-sm mt-1">{personalErrors.last_name.message}</p>
                        )
                      }
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        {...personalForm.register("email")}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2"
                        placeholder="you@example.com"
                      />
                      {
                        personalErrors.email && (
                          <p className="text-red-500 text-sm mt-1">{personalErrors.email.message}</p>
                        )
                      }
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                      <input
                        {...personalForm.register("age")}
                        type="number"
                        min={16}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2"
                        placeholder="18"
                      />
                      {
                        personalErrors.age && (
                          <p className="text-red-500 text-sm mt-1">{personalErrors.age.message}</p>
                        )
                      }
                    </div>

                    <div className="md:col-span-2 flex justify-end mt-6">
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={loading}
                        className={`px-6 py-3 rounded-xl text-white font-medium transition bg-[#2a6df4] ${loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
                          }`}
                      >
                        Next
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div key="academic" variants={containerVariants} initial="enter" animate="center" exit="exit">
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <Dropdown
                      label="Preferred University Type *"
                      options={universityTypes}
                      selected={watch("preferred_university_type")}
                      onChange={(val) => setValue("preferred_university_type", val)}
                      error={academicErrors.preferred_university_type}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Per Semester Budget *
                      </label>
                      <input
                        {...academicForm.register("per_semester_budget")}
                        type="number"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2"
                        placeholder="25000"
                      />
                      {
                        academicErrors.per_semester_budget && (
                          <p className="text-red-500 text-sm mt-1">{academicErrors.per_semester_budget.message}</p>
                        )
                      }
                    </div>
                    <Dropdown
                      label="Budget Bracket *"
                      options={budgetBrackets}
                      selected={watch("budget_bracket")}
                      onChange={(val) => setValue("budget_bracket", val)}
                      error={academicErrors.budget_bracket}
                    />
                    <Dropdown
                      label="Preffered Program Group *"
                      options={programGroups}
                      selected={watch("preferred_program_group")}
                      onChange={(val) => setValue("preferred_program_group", val)}
                      error={academicErrors.preferred_program_group}
                    />
                    <div className="flex items-center gap-4 md:col-span-2 flex-wrap">
                      <label className="flex items-center gap-2">
                        <input {...academicForm.register("scholarship_requirement")} type="checkbox" />
                        <span>Require Scholarship?</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input {...academicForm.register("hostel_requirement")} type="checkbox" />
                        <span>Hostel Requirement?</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input {...academicForm.register("transport_requirement")} type="checkbox" />
                        <span>Transport Requirement?</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input {...academicForm.register("entry_test_requirement")} type="checkbox" />
                        <span>Entry Test Requirement?</span>
                      </label>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Accreditations</label>
                      <textarea
                        {...academicForm.register("accreditations")}
                        rows={3}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-opacity-60"
                        placeholder="E.g., HEC, ABET, AACSB (comma separated)"
                      />
                      {
                        academicErrors.accreditations && (
                          <p className="text-red-500 text-sm mt-1">{academicErrors.accreditations.message}</p>
                        )
                      }
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specific Universities</label>
                      <textarea
                        {...academicForm.register("specific_universities")}
                        rows={3}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-opacity-60"
                        placeholder="List any universities you are interested in"
                      />
                      {
                        academicErrors.specific_universities && (
                          <p className="text-red-500 text-sm mt-1">{academicErrors.specific_universities.message}</p>
                        )
                      }
                    </div>

                    <div className="md:col-span-2 flex justify-between mt-6">
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={loading}
                        className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 bg-white hover:shadow-sm transition"
                      >
                        Back
                      </button>

                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={loading}
                        className={`px-6 py-3 rounded-xl text-white font-medium transition bg-[#2a6df4] ${loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
                          }`}
                      >
                        {loading ? "Saving..." : "Complete Profile"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          You can update this information later in settings.
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;

