import React, { useState } from "react";
import { PenLine, Copy, RefreshCw, Loader2, CheckCircle2, Sparkles } from "lucide-react";
import { rewriteBullet } from "../../services/bulletRewriteService";

const VARIANT_META = {
  quantified:     { label: "Quantified",     color: "bg-blue-50 text-blue-700 border-blue-200" },
  concise:        { label: "Concise",         color: "bg-purple-50 text-purple-700 border-purple-200" },
  keyword_aligned:{ label: "Keyword-Aligned", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
};

/** Renders a bullet text, wrapping [add: ...] placeholders in a highlighted span */
function HighlightedText({ text }) {
  const parts = text.split(/(\[add:[^\]]*\])/g);
  return (
    <>
      {parts.map((part, i) =>
        /^\[add:/.test(part) ? (
          <span
            key={i}
            className="inline-block bg-amber-100 text-amber-800 border border-amber-300 rounded px-1 mx-0.5 text-xs font-mono font-semibold"
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function VariantCard({ variant }) {
  const [copied, setCopied] = useState(false);
  const meta = VARIANT_META[variant.type] || { label: variant.type, color: "bg-gray-50 text-gray-700 border-gray-200" };

  const handleCopy = () => {
    navigator.clipboard.writeText(variant.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-gray-100 rounded-xl p-4 bg-gray-50 space-y-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${meta.color}`}>
          {meta.label}
        </span>
        {variant.has_placeholder && (
          <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1 font-medium">
            <span>⚠</span> Fill in placeholders before using
          </span>
        )}
      </div>
      <p className="text-sm text-gray-800 leading-relaxed">
        <HighlightedText text={variant.text} />
      </p>
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors font-medium"
      >
        {copied
          ? <><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Copied!</>
          : <><Copy className="w-3.5 h-3.5" /> Copy</>
        }
      </button>
    </div>
  );
}

function BulletRewriter({ jobDescription }) {
  const [originalBullet, setOriginalBullet] = useState("");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleRewrite = async () => {
    if (!originalBullet.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await rewriteBullet({
        originalBullet: originalBullet.trim(),
        context: context.trim(),
        jobDescription,
      });
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Failed to rewrite bullet. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
          <PenLine className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Bullet Point Rewriter</h2>
          <p className="text-sm text-gray-500">
            Paste a weak resume bullet and get 3 AI-powered rewrites instantly.
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Resume Bullet <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Worked on the backend to improve performance of the API"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none text-sm text-gray-800 placeholder-gray-400"
            value={originalBullet}
            onChange={(e) => setOriginalBullet(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Context <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Backend Intern at XYZ Corp — Node.js, PostgreSQL, REST APIs"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all text-sm text-gray-800 placeholder-gray-400"
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={handleRewrite}
            disabled={!originalBullet.trim() || loading}
            className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Rewriting...</>
            ) : (
              <><Sparkles className="w-4 h-4" /> Rewrite Bullet</>
            )}
          </button>
          {result && !loading && (
            <button
              onClick={() => { setResult(null); setOriginalBullet(""); setContext(""); setError(null); }}
              className="px-4 py-2.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <RefreshCw className="w-4 h-4" /> Start Over
            </button>
          )}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-6 py-8 flex flex-col items-center justify-center text-gray-500">
          <Loader2 className="w-7 h-7 animate-spin text-purple-600 mb-3" />
          <p className="font-medium text-sm">Generating 3 powerful rewrites...</p>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="mt-6 space-y-3">
          <div className="border-t border-gray-100 pt-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              3 Rewritten Variants
            </p>
            <div className="space-y-3">
              {result.variants.map((variant, i) => (
                <VariantCard key={i} variant={variant} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BulletRewriter;
