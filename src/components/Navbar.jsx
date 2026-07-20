import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import { useAuth } from "../context/AuthContext";
import { User, Menu, X, PlusCircle, History as HistoryIcon, Settings as SettingsIcon, LayoutDashboard, LogIn } from "lucide-react";

function Navbar() {
  const { setSelectedFile, setJobDescription, setAnalysis } = useResume();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleNewAnalysis = () => {
    setSelectedFile(null);
    setJobDescription("");
    setAnalysis(null);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-none border-gray-150 shadow-sm">
      <nav>
        {/* Desktop & Mobile Main Row */}
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-16 h-16 flex justify-between items-center">
          
          {/* Left Section (Logo) */}
          <div className="flex items-center gap-10">
            <NavLink
              to="/"
              className="text-xl sm:text-2xl font-bold text-blue-700 hover:text-blue-500 transition"
              onClick={() => setIsOpen(false)}
            >
              ResumeIQ AI
            </NavLink>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <NavLink
                to="/Dashboard"
                className={({ isActive }) =>
                  `block py-2 px-3 text-sm font-semibold duration-200 ${
                    isActive ? "text-blue-500" : "text-gray-600 hover:text-blue-700"
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/History"
                className={({ isActive }) =>
                  `block py-2 px-3 text-sm font-semibold duration-200 ${
                    isActive ? "text-blue-500" : "text-gray-600 hover:text-blue-700"
                  }`
                }
              >
                History
              </NavLink>

              <NavLink
                to="/Settings"
                className={({ isActive }) =>
                  `block py-2 px-3 text-sm font-semibold duration-200 ${
                    isActive ? "text-blue-500" : "text-gray-600 hover:text-blue-700"
                  }`
                }
              >
                Settings
              </NavLink>
            </div>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-6">
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

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-800 focus:outline-none p-1.5 hover:bg-gray-100 rounded-lg transition"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar Navigation */}
        <div
          className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Overlay backdrop */}
          <div
            className="absolute inset-0 bg-black/35 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Sidebar */}
          <div
            className={`absolute top-0 right-0 h-full w-[280px] bg-white shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out z-50 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Sidebar Top: Logo & Close Button */}
            <div>
              <div className="h-16 px-6 border-b border-gray-100 flex items-center justify-between">
                <span className="text-lg font-bold text-blue-700">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation list */}
              <div className="py-4 px-4 flex flex-col gap-2">
                <NavLink
                  to="/Dashboard"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                      isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </NavLink>

                <NavLink
                  to="/History"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                      isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                >
                  <HistoryIcon size={18} />
                  History
                </NavLink>

                <NavLink
                  to="/Settings"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                      isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                >
                  <SettingsIcon size={18} />
                  Settings
                </NavLink>
              </div>
            </div>

            {/* Sidebar Bottom: Account Status & Primary CTA */}
            <div className="p-5 border-t border-gray-100 bg-gray-50/50">
              {user ? (
                <div className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <User size={15} className="text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate leading-tight">
                      {user.email.split("@")[0]}
                    </p>
                    <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 bg-white px-2.5 py-1 rounded-md border border-gray-200">
                    Guest
                  </span>
                  <NavLink
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-blue-600 transition"
                  >
                    <LogIn size={15} />
                    Log In
                  </NavLink>
                </div>
              )}

              <NavLink
                to="/Dashboard"
                onClick={handleNewAnalysis}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
              >
                <PlusCircle size={16} />
                New Analysis
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;