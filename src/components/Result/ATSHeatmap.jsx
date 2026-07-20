import React, { useState } from "react";
import { BarChart2 } from "lucide-react";

// Max possible score for each category
const MAX_MAP = {
  skills: 20,
  experience: 20,
  education: 10,
  projects: 20,
  keywords: 15,
  formatting: 15,
};

// Display labels for each category key
const LABELS = {
  skills: "Skills",
  experience: "Experience",
  education: "Education",
  projects: "Projects",
  keywords: "Keywords",
  formatting: "Formatting",
};

// One-line tooltip descriptions per category
const DESCRIPTIONS = {
  skills: "How many relevant skills are clearly listed AND demonstrated in use",
  experience: "Clarity and strength of internships/roles and action-verb usage",
  education: "Completeness of degree, institution, year, and grade",
  projects: "Number and technical depth of projects, including live links/repos",
  keywords: "Density of industry-standard terms relevant to your target role",
  formatting: "Structural consistency, section clarity, and appropriate length",
};

// Ordered list so we always render categories in a consistent sequence
const CATEGORY_KEYS = [
  "skills",
  "experience",
  "education",
  "projects",
  "keywords",
  "formatting",
];

function getColorClasses(pct) {
  if (pct >= 80) {
    return {
      tileBase: "bg-green-50 border-green-200",
      accent: "border-l-green-500",
      label: "text-gray-500",
      score: "text-gray-900",
      badge: "bg-green-100 text-green-700",
      bar: "bg-green-500",
      track: "bg-green-100",
      dot: "bg-green-500",
    };
  }
  if (pct >= 50) {
    return {
      tileBase: "bg-amber-50 border-amber-200",
      accent: "border-l-amber-400",
      label: "text-gray-500",
      score: "text-gray-900",
      badge: "bg-amber-100 text-amber-700",
      bar: "bg-amber-400",
      track: "bg-amber-100",
      dot: "bg-amber-400",
    };
  }
  return {
    tileBase: "bg-red-50 border-red-200",
    accent: "border-l-red-400",
    label: "text-gray-500",
    score: "text-gray-900",
    badge: "bg-red-100 text-red-600",
    bar: "bg-red-400",
    track: "bg-red-100",
    dot: "bg-red-400",
  };
}

function HeatmapCell({ categoryKey, score }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const max = MAX_MAP[categoryKey];
  const pct = Math.round((score / max) * 100);
  const colors = getColorClasses(pct);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 w-56 text-center text-xs text-white bg-gray-800 rounded-lg px-3 py-2 shadow-lg pointer-events-none"
        >
          {DESCRIPTIONS[categoryKey]}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
        </div>
      )}

      {/* Cell — white tile with colored left accent */}
      <div
        tabIndex={0}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        aria-label={`${LABELS[categoryKey]}: ${score} out of ${max} (${pct}%)`}
        className={`
          ${colors.tileBase} ${colors.accent}
          rounded-xl border border-l-4 p-4 flex flex-col
          cursor-default select-none
          transition-all duration-150 hover:shadow-sm hover:-translate-y-px
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300
          min-h-[100px]
        `}
      >
        {/* Category label */}
        <span className={`text-[10px] font-semibold uppercase tracking-widest ${colors.label} mb-2`}>
          {LABELS[categoryKey]}
        </span>

        {/* Score + percentage on one row */}
        <div className="flex items-end justify-between">
          <span className={`text-xl font-bold leading-none ${colors.score}`}>
            {score}
            <span className="text-xs font-normal text-gray-400 ml-0.5">/{max}</span>
          </span>
          <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-md ${colors.badge}`}>
            {pct}%
          </span>
        </div>

        {/* Progress bar */}
        <div className={`w-full mt-3 h-1 rounded-full ${colors.track}`}>
          <div
            className={`${colors.bar} h-1 rounded-full transition-all duration-700`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function ATSHeatmap({ breakdown }) {
  // Graceful fallback: missing or incomplete breakdown data
  const hasValidData =
    breakdown &&
    typeof breakdown === "object" &&
    CATEGORY_KEYS.every((k) => typeof breakdown[k] === "number");

  if (!hasValidData) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-2">
          <BarChart2 className="text-gray-400" size={20} />
          <h2 className="text-xl font-bold text-gray-900 font-serif tracking-tight">
            ATS Score Heatmap
          </h2>
        </div>
        <p className="text-sm text-gray-400 italic mt-4">
          Detailed breakdown not available for this analysis.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-900 font-serif tracking-tight">
            ATS Score Heatmap
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Hover a tile to learn what each category measures
          </p>
        </div>
        <BarChart2 className="text-gray-400 shrink-0" size={20} />
      </div>

      {/* 6-cell grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {CATEGORY_KEYS.map((key) => (
          <HeatmapCell key={key} categoryKey={key} score={breakdown[key]} />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mr-1">
          Legend:
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-600">
          <span className="inline-block w-3 h-3 rounded-sm bg-green-500" />
          Strong (80 – 100%)
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-600">
          <span className="inline-block w-3 h-3 rounded-sm bg-amber-400" />
          Needs Improvement (50 – 79%)
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-600">
          <span className="inline-block w-3 h-3 rounded-sm bg-red-400" />
          Weak (0 – 49%)
        </span>
      </div>
    </div>
  );
}

export default ATSHeatmap;
