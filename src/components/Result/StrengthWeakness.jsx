import React from "react";
import {
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

function StrengthWeakness() {
  const strengths = [
    "ATS-friendly formatting",
    "Strong technical skill set",
    "Well-structured resume",
    "Clear project descriptions",
    "Good readability",
  ];

  const weaknesses = [
    "Add more quantified achievements",
    "Include Docker & AWS",
    "Improve professional summary",
    "Use stronger action verbs",
    "Mention measurable impact",
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">

      <h2 className="text-2xl font-bold">
        Resume Assessment
      </h2>

      <p className="text-gray-500 mt-2">
        Here's a quick summary of your resume's strengths and areas that need improvement.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mt-8">

        {/* Strengths */}
        <div className="bg-green-50 border border-green-100 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="text-green-600" />
            </div>

            <h3 className="text-xl font-semibold">
              Strengths
            </h3>
          </div>

          <div className="space-y-4">
            {strengths.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3"
              >
                <CheckCircle2
                  size={18}
                  className="text-green-600 mt-1"
                />

                <p className="text-gray-700">
                  {item}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Weaknesses */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="text-red-500" />
            </div>

            <h3 className="text-xl font-semibold">
              Areas to Improve
            </h3>
          </div>

          <div className="space-y-4">
            {weaknesses.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3"
              >
                <AlertTriangle
                  size={18}
                  className="text-red-500 mt-1"
                />

                <p className="text-gray-700">
                  {item}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}

export default StrengthWeakness;