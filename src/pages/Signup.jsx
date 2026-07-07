import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signUp } from "../services/authService";




function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    const { error } = await signUp(name, email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    alert("Account created successfully!");

    navigate("/dashboard");

  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-10 animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-xl p-8">

        {/* Logo */}
        <h1 className="text-4xl font-bold text-center text-blue-600">
          ResumeIQ AI
        </h1>

        <p className="text-center text-gray-500 mt-3 mb-8">
          Start Your Journey with AI Resume Analysis
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              required
              onChange={(e)=> setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Create password"
              required
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              required
              value={confirmPassword}
              onChange={(e)=> setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 accent-blue-600"
            />

            <p className="text-sm text-gray-600">
              I agree to the{" "}
              <span className="text-blue-600 cursor-pointer hover:underline">
                Terms
              </span>{" "}
              and{" "}
              <span className="text-blue-600 cursor-pointer hover:underline">
                Privacy Policy
              </span>
            </p>
          </div>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <hr className="flex-1" />
          <span className="mx-4 text-gray-400 text-sm">OR</span>
          <hr className="flex-1" />
        </div>

        {/* Google */}
        <button className="w-full border border-gray-300 rounded-lg py-3 flex justify-center items-center gap-3 hover:bg-gray-100 transition">
          <img
            src="/google-icon.svg"
            className="w-5 h-5"
            alt="Google"
          />

          Continue with Google
        </button>

        {/* Login */}
        <p className="text-center text-gray-600 mt-8">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Log In
          </NavLink>
        </p>

      </div>
    </div>
  );
}

export default Signup;