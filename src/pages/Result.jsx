import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ScoreHistory from "../components/Result/ScoreHistory";
import { useAuth } from "../context/AuthContext";

import {
  ResultHero,
  ATSScoreCard,
  ATSHeatmap,
  KeywordAnalysis,
  StrengthWeakness,
  AISuggestions,
  ActionButtons,
  CoverLetterGenerator,
  BulletRewriter,
  InterviewPrep,
} from "../components/Result";

import { useResume } from "../context/ResumeContext";
import { getAnalysisById } from "../services/historyService";

function Result() {
  const { id } = useParams();

  const {
    analysis: contextAnalysis,
    selectedFile,
    jobDescription: contextJobDescription,
    resumeHash: contextResumeHash,
    setResumeHash,
    resumeText: contextResumeText,
  } = useResume();

  const [analysis, setAnalysis] = useState(contextAnalysis);
  const [jobDescription, setJobDescription] = useState(
    contextJobDescription
  );
  const { user } = useAuth();
  const [resumeUrl, setResumeUrl] = useState(null);
  const [fileName, setFileName] = useState(selectedFile?.name || "Resume.pdf");
  const [createdAt, setCreatedAt] = useState(new Date().toISOString());
  const [resumeHash, setLocalResumeHash] = useState(contextResumeHash || null);
  const [jdHash, setJdHash] = useState(null);
  const [resumeText, setResumeText] = useState(contextResumeText || "");
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

    setAnalysis(data.analysis);
    setJobDescription(data.job_description || "");
    setResumeUrl(data.resumes.file_url);
    setFileName(data.resumes.file_name || selectedFile?.name || "Resume.pdf");
    setCreatedAt(data.created_at);

    // Fallback: context won't have this on a fresh page load / refresh / shared link
    const hash = data.resume_hash;
    setLocalResumeHash(hash);
    setResumeHash(hash); // keep context in sync for other components
    setResumeText(data.resume_text || "");
    setJdHash(data.jd_hash || null);

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-gray-600">Loading analysis...</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-gray-600">No analysis found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-16 animate-fadeIn">
      <div className="max-w-5xl mx-auto px-6 pt-10">
        
        {/* --- Top Row: Hero & ATS Score --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-7">
            <ResultHero 
              fileName={fileName}
              jobTitle={analysis.job_title || "Target Role"}
              createdAt={createdAt}
            />
          </div>
          <div className="lg:col-span-5">
            <ATSScoreCard
              atsScore={analysis.ats_score}
              matchPercentage={analysis.match_percentage}
            />
          </div>
        </div>

        {/* --- ATS Heatmap: breakdown of the top-row score --- */}
        <div className="mb-6">
          <ATSHeatmap breakdown={analysis.ats_breakdown} />
        </div>

        {/* --- Middle Row: Keywords & Strengths/Weaknesses --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-5">
            <KeywordAnalysis
              matchedSkills={analysis.matched_skills}
              missingSkills={analysis.missing_skills}
              matchPercentage={analysis.match_percentage}
              hasJobDescription={jobDescription.trim().length > 0}
            />
          </div>
          <div className="lg:col-span-7 flex flex-col gap-6">
            <StrengthWeakness
              type="strengths"
              strengths={analysis.strengths}
            />
            <StrengthWeakness
              type="weaknesses"
              weaknesses={analysis.weaknesses}
            />
          </div>
        </div>

        {/* --- Bullet Rewriter --- */}
        <div className="mb-8">
          <BulletRewriter jobDescription={jobDescription} />
        </div>

        {/* --- Bottom Row: What's Next & Tips --- */}
        <div className="mb-8">
          <AISuggestions suggestions={analysis.suggestions} />
        </div>

        {/* --- Interview Prep --- */}
        <div className="mb-8">
          <InterviewPrep resumeText={resumeText} jobDescription={jobDescription} />
        </div>

        <div className="mb-12">
          <CoverLetterGenerator 
            resumeText={resumeText} 
            jobDescription={jobDescription} 
            analysisId={id} 
            resumeHash={resumeHash} 
            jdHash={jdHash} 
          />
        </div>

      {resumeHash && user && (
        <div className="mb-12">
          <ScoreHistory userId={user.id} resumeHash={resumeHash} />
        </div>
      )}

        {/* --- Action Buttons --- */}
        <ActionButtons
          analysis={analysis}
          file={selectedFile}
          fileUrl={resumeUrl}
          jobDescription={jobDescription}
        />

      </div>
    </div>
  );
}

export default Result;