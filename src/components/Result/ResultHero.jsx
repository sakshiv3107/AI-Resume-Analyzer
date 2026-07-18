import React from "react";
import { BriefcaseBusiness, Clock3 } from "lucide-react";

function ResultHero({ fileName = "Resume.pdf", jobTitle = "Target Role", createdAt }) {
  const timeAgo = (dateString) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.round((now - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 60) return "Just now";
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8 h-full flex flex-col justify-center">
      <p className="text-blue-600 uppercase tracking-[0.2em] text-xs font-semibold">
        RESUME ANALYSIS
      </p>

      <h1 className="text-2xl md:text-3xl font-bold mt-2 text-gray-900 font-serif tracking-tight truncate" title={fileName}>
        {fileName}
      </h1>

      <p className="text-gray-500 mt-2 text-sm max-w-lg leading-relaxed">
        Your resume has been successfully analyzed and compared against the selected <span className="font-semibold text-blue-600">{jobTitle}</span> job description.
      </p>

      <div className="flex flex-wrap gap-6 mt-6 pt-5 border-t border-gray-100 text-gray-500 text-xs font-medium">
        <div className="flex items-center gap-1.5">
          <BriefcaseBusiness size={14} className="text-gray-400" />
          {jobTitle}
        </div>

        <div className="flex items-center gap-1.5">
          <Clock3 size={14} className="text-gray-400" />
          Analyzed {timeAgo(createdAt)}
        </div>
      </div>
    </div>
  );
}

export default ResultHero;