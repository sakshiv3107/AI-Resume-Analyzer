import React from "react";

import {
  ResultHero,
  ATSScoreCard,
  ResumePreview,
  KeywordAnalysis,
  AISuggestions,
  StrengthWeakness,
  ActionButtons,
  AISummary,
} from "../components/Result";

import { useResume } from "../context/ResumeContext";
import { Navigate } from "react-router-dom";

function Result() {
  const { analysis, selectedFile ,jobDescription } = useResume();

  if (!analysis || !selectedFile) {
    return <Navigate to="/dashboard" replace />;
  }
  console.log("RESULT ANALYSIS", analysis);
console.log("RESULT KEYS", Object.keys(analysis));
console.log("RESULT SUGGESTIONS", analysis.suggestions);
  return (
    <div className="bg-gray-50 min-h-screen animate-fadeIn">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero */}
        <ResultHero />
  

{/* Top Section */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-10">

          {/* Left Side */}
          <div className="xl:col-span-5 flex flex-col gap-6">

            <ATSScoreCard
              atsScore={analysis.ats_score}
              matchPercentage={analysis.match_percentage}
            />

            <AISummary
              summary={analysis.summary}
            />

          </div>

          {/* Right Side */}
          <div className="xl:col-span-7">

            <ResumePreview
              file={selectedFile}
            />

          </div>

        </div>
         


        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

          <KeywordAnalysis
    missingKeywords={analysis.missing_keywords}
    missingSkills={analysis.missing_skills}
    matchPercentage={analysis.match_percentage}
    hasJobDescription={jobDescription.trim().length > 0}

/>

          <AISuggestions
    suggestions={analysis.suggestions}
/>

        </div>

        {/* Bottom Section */}
        <div className="mt-8">

          <StrengthWeakness
    strengths={analysis.strengths}
    weaknesses={analysis.weaknesses}
/>

        </div>

        {/* Action Buttons */}
        <div className="mt-8">

          <ActionButtons
  file={selectedFile}
  onDownloadReport={() => {
    console.log("Download report clicked");
  }}
/>

        </div>
 </div>
      </div>
  );
}

export default Result;