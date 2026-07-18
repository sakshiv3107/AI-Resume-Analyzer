import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

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
import { getAnalysisById } from "../services/historyService";

function Result() {
  const { id } = useParams();

  const {
    analysis: contextAnalysis,
    selectedFile,
    jobDescription: contextJobDescription,
  } = useResume();

  const [analysis, setAnalysis] = useState(contextAnalysis);
  const [jobDescription, setJobDescription] = useState(
    contextJobDescription
  );
  const [resumeUrl, setResumeUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetchAnalysis();
  }, [id]);

  const fetchAnalysis = async () => {
    setLoading(true);

    const { data, error } = await getAnalysisById(id);

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    // analysis column contains Gemini response
    setAnalysis(data.analysis);

    setJobDescription(data.job_description || "");

    setResumeUrl(data.resumes.file_url);

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium">
          Loading analysis...
        </p>
      </div>
    );
  }

  if (!analysis) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      No analysis found
    </div>
  );
}

  return (
    <div className="bg-white min-h-screen animate-fadeIn">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <ResultHero />

        {/* Top Section */}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-10">

          <div className="xl:col-span-5 flex flex-col gap-6">

            <ATSScoreCard
              atsScore={analysis.ats_score}
              matchPercentage={analysis.match_percentage}
            />

            <AISummary
              summary={analysis.summary}
            />

          </div>

          <div className="xl:col-span-7">

            <ResumePreview
              file={selectedFile}
              fileUrl={resumeUrl}
            />

          </div>

        </div>

        {/* Middle */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

          <KeywordAnalysis
            matchedSkills={analysis.matched_skills}
            missingSkills={analysis.missing_skills}
            matchPercentage={analysis.match_percentage}
            hasJobDescription={
              jobDescription.trim().length > 0
            }
          />

          <AISuggestions
            suggestions={analysis.suggestions}
          />

        </div>

        {/* Bottom */}

        <div className="mt-8">

          <StrengthWeakness
            strengths={analysis.strengths}
            weaknesses={analysis.weaknesses}
          />

        </div>

        <div className="mt-8">

          <ActionButtons
            analysis={analysis}
            file={selectedFile}
            fileUrl={resumeUrl}
            jobDescription={jobDescription}
          />

        </div>

      </div>
    </div>
  );
}

export default Result;