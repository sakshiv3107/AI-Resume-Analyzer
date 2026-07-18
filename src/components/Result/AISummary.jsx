import React from "react";
import { Sparkles } from "lucide-react";

function AISummary({ summary }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="text-blue-500" size={15} />
        <h2 className="text-sm font-bold text-gray-800">AI Summary</h2>
      </div>
      <p className="text-gray-600 text-xs leading-relaxed">
        {summary}
      </p>
    </div>
  );
}

export default AISummary;