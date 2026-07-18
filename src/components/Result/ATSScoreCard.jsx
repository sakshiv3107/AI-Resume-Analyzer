import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

function ATSScoreCard({ atsScore, matchPercentage }) {
  let badge = "";
  let badgeBg = "";
  let badgeText = "";

  if (atsScore >= 85) {
    badge = "Excellent Match";
    badgeBg = "bg-green-100";
    badgeText = "text-green-700";
  } else if (atsScore >= 70) {
    badge = "Good Match";
    badgeBg = "bg-blue-50";
    badgeText = "text-blue-600";
  } else {
    badge = "Needs Improvement";
    badgeBg = "bg-red-50";
    badgeText = "text-red-700";
  }

  // To perfectly match the mockup's blue ring
  const strokeColor = "#3B82F6"; // Tailwind blue-500
  const matchColor = "#10B981"; // Tailwind emerald-500

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 h-full flex flex-col items-center justify-center">
      
      <div className="flex items-center gap-10">
        <div className="flex flex-col items-center">
          <div className="w-28 h-28">
            <CircularProgressbar
              value={atsScore}
              text={`${atsScore}%`}
              strokeWidth={8}
              styles={buildStyles({
                textSize: "24px",
                pathColor: strokeColor,
                trailColor: "#F3F4F6", // gray-100
                textColor: "#1D4ED8", // blue-700
                pathTransitionDuration: 1.5,
              })}
            />
          </div>
          <h2 className="text-sm font-bold text-gray-900 mt-4 font-serif tracking-tight">
            ATS Score
          </h2>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-28 h-28">
            <CircularProgressbar
              value={matchPercentage}
              text={`${matchPercentage}%`}
              strokeWidth={8}
              styles={buildStyles({
                textSize: "24px",
                pathColor: matchColor,
                trailColor: "#F3F4F6", // gray-100
                textColor: "#047857", // emerald-700
                pathTransitionDuration: 1.5,
              })}
            />
          </div>
          <h2 className="text-sm font-bold text-gray-900 mt-4 font-serif tracking-tight">
            Match Rate
          </h2>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-100 w-full flex justify-center">
        <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${badgeBg} ${badgeText}`}>
          {badge}
        </span>
      </div>
      
    </div>
  );
}

export default ATSScoreCard;