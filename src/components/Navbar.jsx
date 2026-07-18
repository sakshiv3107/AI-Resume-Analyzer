import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useResume } from "../context/ResumeContext";

function Navbar() {
  const { setSelectedFile, setJobDescription, setAnalysis } = useResume();

  const handleNewAnalysis = () => {
    setSelectedFile(null);
    setJobDescription("");
    setAnalysis(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-none shadow-sm">
      <nav>
        <div className="max-w-8xl mx-auto w-full px-16 h-16 flex justify-between items-center">
          
          {/* Left Section */}
          <div className="flex items-center gap-10">
            <NavLink
              to="/"
              className="text-2xl font-bold text-blue-700 hover:text-blue-500 transition"
            >
              ResumeIQ AI
            </NavLink>

            <NavLink
              to="/Dashboard"
              className={({ isActive }) =>
                `block py-2 px-3 duration-200 ${
                  isActive
                    ? "text-blue-500 "
                    : "text-gray-700"
                } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/History"
              className={({ isActive }) =>
                `block py-2 px-3 duration-200 ${
                  isActive
                    ? "text-blue-500 "
                    : "text-gray-700"
                } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
              }
            >
              History
            </NavLink>

            <NavLink
              to="/Settings"
              className={({ isActive }) =>
                `block py-2 px-3 duration-200 ${
                  isActive
                    ? "text-blue-500 "
                    : "text-gray-700"
                } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
              }
            >
              Settings
            </NavLink>
          </div>

          {/* Right Section */}
          <div>
            <NavLink
                to="/Dashboard"
                onClick={handleNewAnalysis}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                New Analysis
            </NavLink>
          </div>

        </div>
      </nav>
    </header>
  );
}

export default Navbar;