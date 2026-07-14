import React from "react";
import {
  Download,
  RotateCcw,
  House,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { generateReport } from "../../services/reportService";

function ActionButtons({
  analysis,
  file,
  fileUrl,
  jobDescription,
}) {
  const fileName =
    file?.name ||
    fileUrl?.split("/").pop() ||
    "Resume.pdf";

  const handleDownload = () => {
    generateReport({
      analysis,
      fileName,
      jobDescription,
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">

      <div className="text-center">
        <h2 className="text-2xl font-bold">
          What's Next?
        </h2>

        <p className="text-gray-500 mt-2">
          Download your AI report or continue improving your resume.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

        {/* Download Report */}

        <button
          onClick={handleDownload}
          className="
            flex items-center justify-center gap-3
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-semibold
            py-4
            rounded-2xl
            transition-all
            hover:scale-[1.02]
          "
        >
          <Download size={20} />
          Download AI Report
        </button>

        {/* Analyze Again */}

        <NavLink
          to="/dashboard"
          className="
            flex items-center justify-center gap-3
            bg-gray-100
            hover:bg-gray-200
            text-gray-800
            font-semibold
            py-4
            rounded-2xl
            transition-all
            hover:scale-[1.02]
          "
        >
          <RotateCcw size={20} />
          Analyze Again
        </NavLink>

        {/* Dashboard */}

        <NavLink
          to="/dashboard"
          className="
            flex items-center justify-center gap-3
            border
            border-gray-300
            hover:border-blue-500
            hover:text-blue-600
            font-semibold
            py-4
            rounded-2xl
            transition-all
            hover:scale-[1.02]
          "
        >
          <House size={20} />
          Dashboard
        </NavLink>

      </div>

    </div>
  );
}

export default ActionButtons;