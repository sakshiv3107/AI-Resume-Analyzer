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
import { saveAnalysis } from "../services/historyService";

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

      console.log("FULL RESPONSE", analysisResult);
      console.log("SUGGESTIONS", analysisResult.suggestions);

      setAnalysis(analysisResult);

      console.log("AFTER SET", analysisResult);

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

      const { data: savedAnalysis, error: analysisError } =
        await saveAnalysis({
          resumeId: uploadResult.resumeId,
          userId: user.id,
          jobDescription,
          analysis: analysisResult,
        });
      console.log("Saved Analysis:", savedAnalysis);
      console.log("Analysis Error:", analysisError);  

      if (analysisError) {
        throw analysisError;
      }
      console.log(savedAnalysis.id);
      navigate(`/result/${savedAnalysis.id}`);
    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-50/50 min-h-screen animate-fadeIn">
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Header */}
        <DashboardHero />

        {/* Summary Strip */}
        <StatsCard />

        {/* New Analysis Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm mb-10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
            <UploadCard 
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />

            <JobDescription 
              jobDescription={jobDescription}
              setJobDescription={setJobDescription} 
            />
          </div>

          <div className="bg-gray-50 border-t border-gray-200 p-6 flex justify-end">
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                rounded-xl
                px-8
                py-3
                font-semibold
                shadow-sm
                transition-all
                disabled:opacity-50
              "
            >
              {loading ? "Analyzing..." : "✨ Analyze Resume"}
            </button>
          </div>
        </div>

        {/* History Section */}
        <div>
          <RecentAnalysis />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;