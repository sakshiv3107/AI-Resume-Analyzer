import React from "react";
import { BriefcaseBusiness, CircleCheckBig } from "lucide-react";

function JobDescription({
  jobDescription,
  setJobDescription,
}) {
  const wordCount = jobDescription
  .trim()
  .split(/\s+/)
  .filter(Boolean).length;

const characterCount = jobDescription.length;
  return (
    <div className="p-6 h-full flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Heading */}
      <div className="flex items-center gap-2 mb-4">
        <BriefcaseBusiness className="text-blue-600" size={20} />
        <h2 className="text-lg font-bold text-gray-900">
          Job Description
        </h2>
      </div>

      {/* Textarea */}
      <textarea
        rows={5}
        placeholder="Paste the complete job description here..."
        className="
          w-full
          rounded-2xl
          border
          border-gray-300
          p-5
          resize-none
          outline-none
          transition
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          placeholder:text-gray-400
        "
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Words:
            <span className="font-medium">
              {" "}
              {wordCount}
            </span>

            •

            Characters:
            <span className="font-medium">
              {" "}
              {characterCount}
            </span>
        </div>

        <button
          onClick={() => setJobDescription("")}
          className="text-blue-600 font-medium hover:underline"
        >
          Clear
        </button>
      </div>

      {/* Tips */}
      <div className="mt-4 rounded-xl bg-blue-50/50 border border-blue-100 p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          For Better Results
        </h3>

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <CircleCheckBig
              className="text-green-600 shrink-0 mt-0.5"
              size={14}
            />
            <p className="text-gray-600 text-xs">
              Include responsibilities, technical skills, and qualifications.
            </p>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default JobDescription;