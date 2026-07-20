import React from "react";
import { Sparkles, BarChart, ArrowRight, Target } from "lucide-react";

function AISuggestions({ suggestions = [] }) {
  // If no suggestions, we don't need to render this section or we can render a placeholder
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  // Take up to 2 suggestions for this specific UI layout
  const displaySuggestions = suggestions.slice(0, 2);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8 mt-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-serif tracking-tight">What's Next?</h2>
          <p className="text-gray-500 text-sm mt-1">
            AI-powered strategy to land your next interview.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors">
          <Sparkles size={16} />
          {suggestions.length} Strategic Tips
        </button>
      </div>

      {/* Suggestion Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displaySuggestions.map((suggestion, index) => {
          const isHighPriority = suggestion.priority === "High";
          
          return (
            <div 
              key={index} 
              className={`rounded-2xl border p-6 flex flex-col justify-between ${
                isHighPriority ? "border-gray-200 bg-gray-50/50" : "border-gray-200 bg-white"
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${
                    isHighPriority ? "text-red-600" : "text-green-600"
                  }`}>
                    {suggestion.priority} PRIORITY
                  </span>
                  {isHighPriority ? (
                    <Target className="text-blue-600" size={18} />
                  ) : (
                    <BarChart className="text-green-600" size={18} />
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 font-serif tracking-tight mb-2">
                  {suggestion.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {suggestion.description}
                </p>
              </div>

              <button className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                isHighPriority ? "text-blue-600 hover:text-blue-800" : "text-green-600 hover:text-green-800"
              }`}>
                
                
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AISuggestions;