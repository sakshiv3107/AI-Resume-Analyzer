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

function Result() {
  return (
    <div className="bg-gray-50 min-h-screen animate-fadeIn">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero */}
        <ResultHero />
  

        {/* Top Section */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-8 mt-10">

          {/* Left Column */}
          <div className="lg:col-span-4 space-y-8">

            <ATSScoreCard />
            <AISummary />

          </div>

          {/* Right Column */}
          <div className="lg:col-span-8">

            <ResumePreview />

          </div>

        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

          <KeywordAnalysis />

          <AISuggestions />

        </div>

        {/* Bottom Section */}
        <div className="mt-8">

          <StrengthWeakness />

        </div>

        {/* Action Buttons */}
        <div className="mt-8">

          <ActionButtons />

        </div>

      </div>
    </div>
  );
}

export default Result;