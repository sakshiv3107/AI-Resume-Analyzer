import React, { useState } from "react";
import { MessageSquare, ChevronDown, ChevronUp, Loader2, RefreshCw } from "lucide-react";
import { generateInterviewQuestions } from "../../services/interviewPrepService";

const CATEGORIES = [
  {
    key: "project_deep_dive",
    label: "Project Deep-Dive",
    icon: "🔍",
    accent: "bg-blue-50 border-blue-200 text-blue-700",
    countColor: "bg-blue-100 text-blue-700",
  },
  {
    key: "technical_skills",
    label: "Technical Skills",
    icon: "⚙️",
    accent: "bg-purple-50 border-purple-200 text-purple-700",
    countColor: "bg-purple-100 text-purple-700",
  },
  {
    key: "behavioral",
    label: "Behavioral",
    icon: "🧠",
    accent: "bg-emerald-50 border-emerald-200 text-emerald-700",
    countColor: "bg-emerald-100 text-emerald-700",
  },
  {
    key: "gap_probing",
    label: "Gap-Probing",
    icon: "⚠️",
    accent: "bg-amber-50 border-amber-200 text-amber-700",
    countColor: "bg-amber-100 text-amber-700",
  },
];

function QuestionCard({ question, why_asked, index }) {
  return (
    <div className="border border-gray-100 rounded-xl p-4 bg-white space-y-2">
      <div className="flex gap-3 items-start">
        <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center">
          {index + 1}
        </span>
        <p className="text-sm font-medium text-gray-800 leading-relaxed">{question}</p>
      </div>
      <p className="text-xs text-gray-500 italic pl-8 leading-relaxed">{why_asked}</p>
    </div>
  );
}

function CategorySection({ category, questions }) {
  const [open, setOpen] = useState(true);

  if (!questions || questions.length === 0) return null;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">{category.icon}</span>
          <span className="text-sm font-semibold text-gray-800">{category.label}</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${category.countColor}`}>
            {questions.length}
          </span>
        </div>
        {open
          ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
          : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        }
      </button>

      {/* Questions */}
      {open && (
        <div className="p-4 space-y-3 bg-gray-50/50">
          {questions.map((q, i) => (
            <QuestionCard key={i} index={i} question={q.question} why_asked={q.why_asked} />
          ))}
        </div>
      )}
    </div>
  );
}

function InterviewPrep({ resumeText, jobDescription }) {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setQuestions(null);

    try {
      const data = await generateInterviewQuestions({ resumeText, jobDescription });
      setQuestions(data);
    } catch (err) {
      console.error(err);
      setError("Failed to generate interview questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalCount = questions
    ? Object.values(questions).reduce((sum, arr) => sum + arr.length, 0)
    : 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Interview Prep</h2>
            <p className="text-sm text-gray-500">
              AI-generated questions tailored to your specific resume and role.
            </p>
          </div>
        </div>
        {questions && !loading && (
          <button
            onClick={handleGenerate}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium rounded-lg transition-colors text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Regenerate
          </button>
        )}
      </div>

      {/* Initial state — no questions yet */}
      {!questions && !loading && (
        <div className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            onClick={handleGenerate}
            disabled={!resumeText}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MessageSquare className="w-4 h-4" />
            Generate Interview Questions
          </button>
          {!resumeText && (
            <p className="text-xs text-gray-400">Resume text is required to generate questions.</p>
          )}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="py-10 flex flex-col items-center justify-center text-gray-500">
          <Loader2 className="w-7 h-7 animate-spin text-indigo-600 mb-3" />
          <p className="font-medium text-sm">Generating questions tailored to your resume...</p>
          <p className="text-xs text-gray-400 mt-1">This may take a moment</p>
        </div>
      )}

      {/* Results */}
      {questions && !loading && (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              {totalCount} Questions across {CATEGORIES.filter(c => questions[c.key]?.length > 0).length} categories
            </p>
          </div>
          {CATEGORIES.map((cat) =>
            // gap_probing: skip entirely if empty
            cat.key === "gap_probing" && (!questions[cat.key] || questions[cat.key].length === 0) ? null : (
              <CategorySection
                key={cat.key}
                category={cat}
                questions={questions[cat.key] || []}
              />
            )
          )}
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
}

export default InterviewPrep;
