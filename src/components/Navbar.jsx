import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import { useAuth } from "../context/AuthContext";
import { User } from "lucide-react";

function Navbar() {
  const { setSelectedFile, setJobDescription, setAnalysis } = useResume();
  const { user } = useAuth();

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
          <div className="flex items-center gap-6">
            {/* User status / Login link */}
            {user ? (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200" title={user.email}>
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <User size={12} className="text-blue-600" />
                </div>
                <span className="text-xs font-medium text-gray-600 max-w-[140px] truncate">
                  {user.email.split("@")[0]}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                  Guest
                </span>
                <NavLink
                  to="/login"
                  className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition"
                >
                  Log In
                </NavLink>
              </div>
            )}

            <NavLink
              to="/Dashboard"
              onClick={handleNewAnalysis}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
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