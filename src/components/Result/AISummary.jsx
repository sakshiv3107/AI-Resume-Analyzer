import React from "react";
import { Sparkles } from "lucide-react";

function AISummary({ summary }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
          <Sparkles className="text-blue-600" size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            AI Summary
          </h2>

          <p className="text-sm text-gray-500">
            Quick overview
          </p>
        </div>
      </div>

      <p className="text-gray-600 leading-7">
        {summary}
      </p>
    </div>
  );
}

export default AISummary;