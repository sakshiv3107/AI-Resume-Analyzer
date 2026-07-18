import React from "react";
import { CheckCircle2, AlertTriangle, Circle } from "lucide-react";

function StrengthWeakness({
  strengths = [],
  weaknesses = [],
  type = "all",
}) {
  const renderStrengths = () => (
    <div className="bg-white rounded-2xl border border-gray-200 border-t-4 border-t-green-600 p-6 lg:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <CheckCircle2 className="text-green-600" size={20} />
        <h3 className="text-lg font-bold text-gray-900 font-serif tracking-tight">Key Strengths</h3>
      </div>
      <div className="space-y-4">
        {strengths.length > 0 ? (
          strengths.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <Circle size={14} className="text-green-600 mt-1 flex-shrink-0" />
              <p className="text-gray-600 text-sm leading-relaxed">{item}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No strengths available.</p>
        )}
      </div>
    </div>
  );

  const renderWeaknesses = () => (
    <div className="bg-white rounded-2xl border border-gray-200 border-t-4 border-t-red-600 p-6 lg:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="text-red-600" size={20} />
        <h3 className="text-lg font-bold text-gray-900 font-serif tracking-tight">Areas to Improve</h3>
      </div>
      <div className="space-y-4">
        {weaknesses.length > 0 ? (
          weaknesses.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <Circle size={14} className="text-red-600 mt-1 flex-shrink-0" />
              <p className="text-gray-600 text-sm leading-relaxed">{item}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No major weaknesses detected.</p>
        )}
      </div>
    </div>
  );

  if (type === "strengths") return renderStrengths();
  if (type === "weaknesses") return renderWeaknesses();

  return (
    <div className="flex flex-col gap-6">
      {renderStrengths()}
      {renderWeaknesses()}
    </div>
  );
}

export default StrengthWeakness;