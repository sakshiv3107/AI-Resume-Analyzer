import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

function ATSScoreCard({
  atsScore,
  matchPercentage,
}) {
  let badge = "";
  let badgeColor = "";
  let description = "";

  if (atsScore >= 85) {
    badge = "Excellent Match";
    badgeColor = "bg-green-100 text-green-700";
    description =
      "Your resume is highly compatible with the provided job description.";
  } else if (atsScore >= 70) {
    badge = "Good Match";
    badgeColor = "bg-yellow-100 text-yellow-700";
    description =
      "Your resume has a good match but can be improved further.";
  } else {
    badge = "Needs Improvement";
    badgeColor = "bg-red-100 text-red-700";
    description =
      "Your resume needs improvements to better match the job description.";
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 w-full">
      <h2 className="text-2xl font-bold text-center">
        ATS Score
      </h2>

      <div className="w-48 h-48 mx-auto my-8">
        <CircularProgressbar
          value={atsScore}
          text={`${atsScore}%`}
          styles={buildStyles({
            textSize: "18px",
            pathColor: "#2563EB",
            trailColor: "#E5E7EB",
            textColor: "#111827",
          })}
        />
      </div>

      <div className="text-center">
        <span
          className={`px-3 py-2 rounded-full text-sm font-semibold ${badgeColor}`}
        >
          {badge}
        </span>

        <p className="mt-5 text-gray-600">
          {description}
        </p>
      </div>

      <div className="border-t mt-8 pt-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">
            Match Percentage
          </span>

          <span className="font-semibold text-blue-600">
            {matchPercentage}%
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            ATS Score
          </span>

          <span className="font-semibold text-green-600">
            {atsScore}%
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            Overall Status
          </span>

          <span
            className={`font-semibold ${
              atsScore >= 85
                ? "text-green-600"
                : atsScore >= 70
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {badge}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ATSScoreCard;