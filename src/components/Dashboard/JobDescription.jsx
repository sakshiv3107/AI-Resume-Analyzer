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
    <div className="bg-white rounded-3xl border shadow-sm p-8 h-full flex flex-col border-gray-200">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <BriefcaseBusiness className="text-blue-600" size={22} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Job Description
          </h2>

          <p className="text-gray-500 mt-1">
            Paste the target job description to compare it with your resume.
          </p>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        rows={7}
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
      <div className="mt-8 rounded-2xl bg-blue-50 border border-blue-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">
          For Better Results
        </h3>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CircleCheckBig
              className="text-green-600"
              size={18}
            />
            <p className="text-gray-600 text-sm">
              Include the complete job responsibilities.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <CircleCheckBig
              className="text-green-600"
              size={18}
            />
            <p className="text-gray-600 text-sm">
              Include required technical skills.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <CircleCheckBig
              className="text-green-600"
              size={18}
            />
            <p className="text-gray-600 text-sm">
              Include qualifications and experience requirements.
            </p>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default JobDescription;