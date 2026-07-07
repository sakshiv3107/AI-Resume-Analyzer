import React from "react";
import { NavLink } from "react-router-dom";

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Login Logic
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-10 animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
        {/* Logo */}
        <h1 className="text-4xl font-bold text-center text-blue-600">
          ResumeIQ AI
        </h1>

        <p className="text-center text-gray-500 mt-3 mb-8">
          Intelligent Precision for Your Career
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between mb-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>

          {/* Login */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <hr className="flex-1 border-gray-300" />

          <span className="mx-4 text-sm text-gray-400">OR</span>

          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Login */}
        <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-100 transition">
          <img
            src="/google-icon.svg"
            alt="Google"
            className="w-5 h-5"
          />

          <span className="font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        {/* Signup */}
        <p className="text-center text-gray-600 mt-8">
          Don't have an account?{" "}
          <NavLink
            to="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;