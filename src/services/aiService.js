import { analyzeResumeGemini } from "./geminiService";
import { analyzeResumeGrok } from "./grokService";

export const analyzeResume = async (
  resumeText,
  jobDescription = "",
  provider = "grok"
) => {

  switch (provider) {

    case "grok":
      return analyzeResumeGrok(resumeText, jobDescription);

    case "gemini":
    default:
      return analyzeResumeGemini(resumeText, jobDescription);
  }
};