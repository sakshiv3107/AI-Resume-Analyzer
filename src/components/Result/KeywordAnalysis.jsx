import React from "react";
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
} from "lucide-react";

function KeywordAnalysis({
  matchedSkills = [],
  missingSkills = [],
  matchPercentage = 0,
  hasJobDescription = false,
}) {
  return (
    <div className="h-full">

      {/* Heading */}
      <h2 className="text-2xl font-bold">
        Keyword Analysis
      </h2>

      <p className="text-gray-500 mt-2">
        Compare your resume skills with the job description.
      </p>

      {/* Progress */}
      <div className="mt-8">

        <div className="flex justify-between mb-2">
          <span className="font-medium text-gray-700">
            Overall Match
          </span>

          <span className="text-blue-600 font-semibold">
            {hasJobDescription ? `${matchPercentage}%` : "--"}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              hasJobDescription ? "bg-blue-600" : "bg-gray-300"
            }`}
            style={{
              width: hasJobDescription ? `${matchPercentage}%` : "0%",
            }}
          />
        </div>

      </div>

      {/* Matched Skills */}
      <div className="mt-8">

        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2
            className="text-green-600"
            size={22}
          />

          <h3 className="font-semibold text-lg">
            Matched Skills ({matchedSkills.length})
          </h3>
        </div>

        <div className="flex flex-wrap gap-3">

          {matchedSkills.length > 0 ? (
            matchedSkills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium transition-all duration-300 hover:bg-green-600 hover:text-white"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-500">
              No matched skills detected.
            </p>
          )}

        </div>

      </div>

      {/* Missing Skills */}
      <div className="mt-8">

        <div className="flex items-center gap-2 mb-4">
          <XCircle
            className="text-red-500"
            size={22}
          />

          <h3 className="font-semibold text-lg">
            Missing Skills
          </h3>
        </div>

        {!hasJobDescription ? (
          <div className="border border-dashed border-gray-300 rounded-xl bg-gray-50 p-5 text-center">
            <p className="font-semibold text-gray-700">
              No Job Description Provided
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Add a job description during analysis to compare your resume and identify missing skills.
            </p>
          </div>
        ) : missingSkills.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {missingSkills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-red-100 text-red-600 text-sm font-medium transition-all duration-300 hover:bg-red-500 hover:text-white"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-green-600 font-medium">
            🎉 Great! No important skills are missing.
          </p>
        )}

      </div>

      {/* AI Insight */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-4">

        <Lightbulb className="text-blue-600 mt-1 flex-shrink-0" />

        <div>
          <h4 className="font-semibold">
            AI Insight
          </h4>

          <p className="text-gray-600 mt-2">
            {!hasJobDescription
              ? "Provide a job description to receive an accurate ATS match score, keyword comparison, and personalized recommendations."
              : missingSkills.length > 0
              ? "Adding the missing skills where relevant can improve your ATS score and better align your resume with the job description."
              : "Excellent! Your resume already contains most of the important skills required for this role."}
          </p>

        </div>

      </div>

    </div>
  );
}

export default KeywordAnalysis;