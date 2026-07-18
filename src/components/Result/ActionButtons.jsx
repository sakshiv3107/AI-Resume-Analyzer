import React from "react";
import { Download, RotateCcw, LayoutGrid } from "lucide-react";
import { NavLink } from "react-router-dom";
import { generateReport } from "../../services/reportService";

function ActionButtons({ analysis, file, fileUrl, jobDescription }) {
  const fileName = file?.name || fileUrl?.split("/").pop() || "Resume.pdf";

  const handleDownload = () => {
    generateReport({ analysis, fileName, jobDescription });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
      {/* Download Report */}
      <button
        onClick={handleDownload}
        className="w-full sm:w-[240px] flex items-center justify-center gap-3 bg-[#2563EB] hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all"
      >
        <Download size={18} />
        Download AI Report
      </button>

      {/* Analyze Again */}
      <NavLink
        to="/dashboard"
        className="w-full sm:w-[240px] flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium py-3 rounded-lg transition-all"
      >
        <RotateCcw size={18} />
        Analyze Again
      </NavLink>

      {/* Dashboard */}
      <NavLink
        to="/dashboard"
        className="w-full sm:w-[240px] flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium py-3 rounded-lg transition-all"
      >
        <LayoutGrid size={18} />
        Dashboard
      </NavLink>
    </div>
  );
}

export default ActionButtons;