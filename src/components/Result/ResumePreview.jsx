import React from "react";
import {
  Download,
  ExternalLink,
} from "lucide-react";

function ResumePreview() {
  return (
    <div className="bg-white rounded-3xl border-gray-200 shadow-sm p-8 h-full flex flex-col w-full">

      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Resume Preview
        </h2>

        <p className="text-gray-500 mt-2">
          Review your uploaded resume before downloading.
        </p>
      </div>

      {/* Preview Area */}
      <div className="flex-1 border border-gray-200 rounded-2xl bg-gray-50 flex items-center justify-center p-8">

        {/* Resume */}
        <div className="w-72 h-[420px] bg-white rounded-lg shadow-md border border-gray-200 p-5 relative overflow-hidden transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">

          {/* Header */}
          <div className="flex justify-between items-center mb-5">
            <div>
              <div className="h-3 w-32 bg-gray-800 rounded"></div>
              <div className="h-2 w-20 bg-gray-300 rounded mt-2"></div>
            </div>

            <div className="w-12 h-12 rounded-full bg-blue-100"></div>
          </div>

          {/* Experience */}
          <div className="mb-5">
            <div className="h-2 w-24 bg-blue-600 rounded mb-3"></div>

            <div className="space-y-2">
              <div className="h-2 bg-gray-300 rounded w-full"></div>
              <div className="h-2 bg-gray-300 rounded w-5/6"></div>
              <div className="h-2 bg-gray-300 rounded w-4/6"></div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-5">
            <div className="h-2 w-20 bg-blue-600 rounded mb-3"></div>

            <div className="space-y-2">
              <div className="h-2 bg-gray-300 rounded w-full"></div>
              <div className="h-2 bg-gray-300 rounded w-3/4"></div>
              <div className="h-2 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <div className="h-2 w-16 bg-blue-600 rounded mb-3"></div>

            <div className="flex flex-wrap gap-2">
              {["React", "Node", "SQL", "Git"].map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 text-[10px] rounded bg-blue-100 text-blue-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Watermark */}
          <div className="absolute bottom-3 right-4 text-[11px] text-gray-400">
            Resume Preview
          </div>
        </div>
      </div>

      {/* File Details */}
      <div className="grid grid-cols-3 gap-4 mt-8">

        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">Type</p>
          <h3 className="font-semibold mt-1">PDF</h3>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">Pages</p>
          <h3 className="font-semibold mt-1">2</h3>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">Size</p>
          <h3 className="font-semibold mt-1">482 KB</h3>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-8">

        <button className="flex-1 border border-gray-300 rounded-xl py-3 font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition">
          <ExternalLink size={18} />
          Open
        </button>

        <button className="flex-1 bg-blue-600 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition">
          <Download size={18} />
          Download
        </button>

      </div>

    </div>
  );
}

export default ResumePreview;