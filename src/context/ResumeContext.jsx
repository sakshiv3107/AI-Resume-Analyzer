import { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

export function ResumeProvider({ children }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resumeHash, setResumeHash] = useState(null);
  const [resumeText, setResumeText] = useState("");

  return (
    <ResumeContext.Provider
      value={{
        selectedFile,
        setSelectedFile,

        jobDescription,
        setJobDescription,

        analysis,
        setAnalysis,

        loading,
        setLoading,

        resumeHash,
        setResumeHash,

        resumeText,
        setResumeText,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  return useContext(ResumeContext);
}