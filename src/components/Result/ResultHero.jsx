import React from "react";
import { FileText, BriefcaseBusiness, Clock3 } from "lucide-react";

function ResultHero() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        {/* Left */}
        <div>
          <p className="text-blue-600 uppercase tracking-[0.3em] text-xs font-semibold">
            Resume Analysis
          </p>

          <h1 className="text-4xl font-bold mt-3 text-gray-900">
            Software_Engineer_Resume.pdf
          </h1>

          <p className="text-gray-500 mt-3 max-w-xl">
            Your resume has been successfully analyzed and compared
            against the selected job description.
          </p>

          <div className="flex flex-wrap gap-6 mt-6 text-gray-600 text-sm">

            <div className="flex items-center gap-2">
              <BriefcaseBusiness size={18} className="text-blue-600" />
              Frontend Developer
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={18} className="text-blue-600" />
              Analyzed 2 minutes ago
            </div>

          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 bg-green-50 border border-green-200 rounded-2xl px-6 py-4">

          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
            <FileText className="text-green-600" size={28} />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Status
            </p>

            <h3 className="font-semibold text-green-600">
              Analysis Completed
            </h3>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ResultHero;