import React, { useState } from "react";
import { CheckCircle2, XCircle, TerminalSquare } from "lucide-react";

const INITIAL_SHOW = 15;

function KeywordAnalysis({
  matchedSkills = [],
  missingSkills = [],
  hasJobDescription = false,
}) {
  const [showAllMatched, setShowAllMatched] = useState(false);
  const visibleMatched = showAllMatched
    ? matchedSkills
    : matchedSkills.slice(0, INITIAL_SHOW);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 font-serif tracking-tight">Keyword Analysis</h2>
        <TerminalSquare className="text-gray-400" size={20} />
      </div>

      {/* Matched Skills */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="text-green-600" size={18} />
          <h3 className="text-sm font-semibold text-green-700">
            Matched Skills ({matchedSkills.length})
          </h3>
        </div>
        
        {matchedSkills.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-2.5">
              {visibleMatched.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-1.5 rounded bg-white text-gray-600 text-xs font-medium border border-gray-200 hover:bg-gray-50 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
            {matchedSkills.length > INITIAL_SHOW && (
              <button
                onClick={() => setShowAllMatched(!showAllMatched)}
                className="mt-4 text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
              >
                {showAllMatched ? "Show less" : `Show ${matchedSkills.length - INITIAL_SHOW} more`}
              </button>
            )}
          </>
        ) : (
          <p className="text-gray-400 text-sm">No matched skills detected.</p>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-8" />

      {/* Missing Keywords */}
      <div>
        {!hasJobDescription ? (
          <div className="text-gray-500 text-sm italic">
            Add a Job Description to identify missing skills.
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="text-red-500" size={18} />
              <h3 className="text-sm font-semibold text-red-600">
                Missing Keywords ({missingSkills.length})
              </h3>
            </div>
            {missingSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2.5">
                {missingSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 rounded bg-red-50 text-red-600 text-xs font-medium border border-red-100 hover:bg-red-100 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-green-600 text-sm font-medium">
                🎉 No important skills are missing.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default KeywordAnalysis;