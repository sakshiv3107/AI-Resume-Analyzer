import React from "react";
import { UploadCloud, FileText } from "lucide-react";

function UploadCard() {
  return (
    <div className="bg-white rounded-3xl  shadow-sm p-8 h-full flex flex-col border-gray-200">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Upload Resume
        </h2>

        <p className="text-gray-500 mt-2">
          Upload your resume in PDF or DOCX format to begin the AI analysis.
        </p>
      </div>

      {/* Upload Area */}
      <div
        className="
          border-2
          border-dashed
          border-blue-300
          rounded-2xl
          p-8
          flex
          flex-col
          items-center
          justify-center
          text-center
          hover:border-blue-600
          hover:bg-blue-50/40
          transition-all
          duration-300
          cursor-pointer
        "
      >
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
          <UploadCloud
            size={40}
            className="text-blue-600"
          />
        </div>

        <h3 className="text-2xl font-semibold text-gray-900">
          Drag & Drop Resume
        </h3>

        <p className="text-gray-500 mt-3">
          PDF or DOCX (Maximum 5 MB)
        </p>

        <button
          className="
            mt-8
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >
          Browse Files
        </button>
      </div>

      {/* Supported Formats */}
      <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
        <FileText className="text-blue-600" size={18} />

        <span>
          Supported formats: PDF, DOC, DOCX
        </span>
      </div>
    </div>
  );
}

export default UploadCard;