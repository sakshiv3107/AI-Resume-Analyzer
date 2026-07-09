import {React , useState} from "react";
import { NavLink } from "react-router-dom";
import {
  DashboardHero,
  UploadCard,
  JobDescription,
  StatsCard,
  RecentAnalysis,
} from "../components/Dashboard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useResume } from "../context/ResumeContext";

import { extractTextFromPDF } from "../services/pdfService";
import { analyzeResume } from "../services/analysisService";
import { uploadResume } from "../services/resumeService";

function Dashboard() {

  const navigate = useNavigate();
  const { user } = useAuth();
  const {
  selectedFile,
  setSelectedFile,

  jobDescription,
  setJobDescription,

  analysis,
  setAnalysis,

  loading,
  setLoading,
} = useResume();

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert("Please upload a resume.");
      return;
    }

    setLoading(true);

    try {
      // Extract text
      const resumeText = await extractTextFromPDF(selectedFile);

      // AI Analysis
      const analysisResult = await analyzeResume(
        resumeText,
        jobDescription
      );

      setAnalysis(analysisResult);

      // Guest user
      if (!user) {
        navigate("/result");
        return;
      }

      // Upload Resume
      const uploadResult = await uploadResume(
        selectedFile,
        user.id
      );

      if (uploadResult.error) {
        throw uploadResult.error;
      }

      // TODO:
      // saveResume(uploadResult);
      // saveAnalysis(analysisResult);

      navigate("/result");
    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen animate-fadeIn">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero */}
        <DashboardHero />

        {/* Upload + Job Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          <UploadCard selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}/>

          <JobDescription jobDescription={jobDescription}
    setJobDescription={setJobDescription} />

        </div>

        {/* Analyze Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="
              w-full
              bg-linear-to-r
              from-blue-600
              to-blue-500
              text-white
              rounded-2xl
              py-4
              font-semibold
              shadow-lg
              hover:scale-[1.02]
              transition-all
              mb-12
              disabled:opacity-50
            "
          >
            {loading ? "Analyzing..." : "✨ Analyze Resume →"}
          </button>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

            <StatsCard />
            <RecentAnalysis />

        </div>

      </div>
    </div>
  );
}

export default Dashboard;