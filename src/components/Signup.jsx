import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../validations/authSchema";
import authService from "../supabase/authService";
import { Chrome, Loader2, Lock, Mail } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const signupHandler = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.createAccount(data);
      if (session) navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/40 backdrop-blur-md border border-white/20 shadow-lg">
        {/* header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Create Your Account
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Join EduBridge to explore universities & programs
          </p>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit(signupHandler)} className="space-y-5">
          

          {/* divider */}
          <div className="relative text-center my-4">
            <span className="absolute left-0 top-1/2 w-full border-t border-gray-300"></span>
            <span className="relative px-3 bg-[#F5F9FD] text-sm text-gray-500">
              OR
            </span>
          </div>

          {/* Email field */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="flex items-center mt-2 border border-gray-300 rounded-lg px-3 py-2 bg-transparent focus-within:border-blue-500 transition">
              <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full bg-transparent outline-none ml-2 text-gray-800"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password field */}
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="flex items-center mt-2 border border-gray-300 rounded-lg px-3 py-2 bg-transparent focus-within:border-blue-500 transition">
              <Lock size={18} className="text-gray-400" />
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                className="w-full bg-transparent outline-none ml-2 text-gray-800"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 mt-4 rounded-lg text-white font-medium transition flex items-center justify-center gap-2 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* error */}
          {error && <p className="text-red-500 text-center mt-3">{error}</p>}

          {/* footer link */}
          <div className="text-center text-sm mt-6 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
