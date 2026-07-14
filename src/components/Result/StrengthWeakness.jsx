import React from "react";
import {
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

function StrengthWeakness({
  strengths = [],
  weaknesses = [],
}) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">

      {/* Heading */}
      <h2 className="text-2xl font-bold">
        Resume Assessment
      </h2>

      <p className="text-gray-500 mt-2">
        Here's a quick summary of your resume's strengths and areas for improvement.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mt-8">

        {/* Strengths */}
        <div className="bg-green-50 border border-green-100 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="text-green-600" />
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                Strengths
              </h3>

              <p className="text-sm text-gray-500">
                {strengths.length} strengths identified
              </p>
            </div>
          </div>

          <div className="space-y-4">

            {strengths.length > 0 ? (
              strengths.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={18}
                    className="text-green-600 mt-1 flex-shrink-0"
                  />

                  <p className="text-gray-700">
                    {item}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No strengths available.
              </p>
            )}

          </div>

        </div>

        {/* Weaknesses */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="text-red-500" />
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                Areas to Improve
              </h3>

              <p className="text-sm text-gray-500">
                {weaknesses.length} improvement suggestions
              </p>
            </div>
          </div>

          <div className="space-y-4">

            {weaknesses.length > 0 ? (
              weaknesses.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <AlertTriangle
                    size={18}
                    className="text-red-500 mt-1 flex-shrink-0"
                  />

                  <p className="text-gray-700">
                    {item}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No major weaknesses detected.
              </p>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default StrengthWeakness;