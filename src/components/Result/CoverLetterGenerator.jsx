import React, { useState } from "react";
import { Mail, Copy, RefreshCw, Loader2, CheckCircle2 } from "lucide-react";
import { generateCoverLetter, saveCoverLetter } from "../../services/coverLetterService";
import { useAuth } from "../../context/AuthContext";

function CoverLetterGenerator({ resumeText, jobDescription, analysisId, resumeHash, jdHash }) {
  const { user } = useAuth();
  const [companyName, setCompanyName] = useState("");
  const [roleName, setRoleName] = useState("");
  const [tone, setTone] = useState("professional");
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setCopied(false);

    try {
      const data = await generateCoverLetter({
        resumeText,
        jobDescription,
        companyName,
        roleName,
        tone
      });

      setCoverLetter(data);

      if (user) {
        // Silently save if logged in
        saveCoverLetter({
          userId: user.id,
          analysisId: analysisId || null,
          resumeHash,
          jdHash: jdHash || null,
          companyName,
          roleName,
          tone,
          content: data
        }).catch(err => console.error("Failed to save cover letter:", err));
      }

    } catch (err) {
      console.error(err);
      setError("Failed to generate cover letter. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (coverLetter?.full_text) {
      navigator.clipboard.writeText(coverLetter.full_text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <Mail className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Cover Letter Generator</h2>
          <p className="text-sm text-gray-500">Create a personalized cover letter based on your resume and the job description.</p>
        </div>
      </div>

      {!coverLetter && !loading && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Google"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Role (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Frontend Engineer"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
            <div className="flex flex-wrap gap-3">
              {['professional', 'enthusiastic', 'concise'].map(t => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    tone === t 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            onClick={handleGenerate}
            disabled={!resumeText}
            className="w-full sm:w-auto mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate Cover Letter
          </button>
        </div>
      )}

      {loading && (
        <div className="py-12 flex flex-col items-center justify-center text-gray-500">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
          <p className="font-medium">Crafting your personalized cover letter...</p>
        </div>
      )}

      {coverLetter && !loading && (
        <div className="space-y-4">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 whitespace-pre-wrap text-gray-700 font-serif leading-relaxed">
            {coverLetter.full_text}
          </div>
          
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
            <button
              onClick={handleGenerate}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoverLetterGenerator;
