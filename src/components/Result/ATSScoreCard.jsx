import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { BadgeCheck } from "lucide-react";

function ATSScoreCard() {
  const score = 92;

let badge = "";
let badgeColor = "";

if (score >= 85) {
  badge = "Excellent Match";
  badgeColor = "bg-green-100 text-green-700";
} else if (score >= 70) {
  badge = "Good Match";
  badgeColor = "bg-yellow-100 text-yellow-700";
} else {
  badge = "Needs Improvement";
  badgeColor = "bg-red-100 text-red-700";
}

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 w-full">

      <h2 className="text-2xl font-bold text-center">
        ATS Score
      </h2>

      <div className="w-48 h-48 mx-auto my-8">
        <CircularProgressbar
          value={score}
          text={`${score}`}
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
          Your resume is highly compatible with the provided job description.
        </p>
      </div>

      <div className="border-t mt-8 pt-6 space-y-4">

        <div className="flex justify-between">
          <span className="text-gray-600">
            Formatting
          </span>

          <span className="font-semibold text-green-600">
            Excellent
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            Keywords
          </span>

          <span className="font-semibold text-blue-600">
            38 Matched
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            Readability
          </span>

          <span className="font-semibold text-green-600">
            Good
          </span>
        </div>

      </div>

    </div>
  );
}

export default ATSScoreCard;