import React from "react";
import {
  Download,
  FileText,
  RotateCcw,
  House,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function ActionButtons({
  file,
  onDownloadReport,
}) {
  const resumeUrl = file ? URL.createObjectURL(file) : null;

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 items-center justify-center">

      {/* Heading */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">
          What's Next?
        </h2>

        <p className="text-gray-500 mt-2">
          Download your resume, save your AI report, or analyze another resume.
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-5">

        {/* Download Resume */}
        {resumeUrl && (
          <a
            href={resumeUrl}
            download={file.name}
            className="
            w-80
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
            Resume
          </a>
        )}

    

        {/* Analyze Again */}
        <NavLink
          to="/dashboard"
          className="
          w-80
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
          <RotateCcw size={20} />
          Analyze Again
        </NavLink>

        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className="
          w-80
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
          <House size={20} />
          Dashboard
        </NavLink>

      </div>

    </div>
  );
}

export default ActionButtons;