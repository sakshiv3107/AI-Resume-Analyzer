import React from "react";
import {
  FileSearch,
  ClipboardList,
  Target,
  ArrowRight,
} from "lucide-react";

function StatsCard() {
  const hasAnalysis = false; // Later this will come from your backend

  if (!hasAnalysis) {
    return (
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 h-full flex flex-col">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900">
          Quick Stats
        </h2>

        <p className="text-gray-500 mt-2">
          Your resume analysis overview will appear here.
        </p>

        {/* Empty State */}
        <div className="text-center py-8">

    <FileSearch
        size={35}
        className="mx-auto text-blue-500"
    />

    <h3 className="mt-4 font-semibold">
        No Stats Yet
    </h3>

    <p className="text-sm text-gray-500 mt-2">
        Analyze your first resume to unlock statistics.
    </p>

</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
      {/* Heading */}
      <h2 className="text-2xl font-bold">
        Quick Stats
      </h2>

      <p className="text-gray-500 mt-2 mb-8">
        Overview of your resume analysis
      </p>

      {/* ATS */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 mb-5">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
              <FileSearch className="text-blue-600" />
            </div>

            <div>
              <p className="text-gray-500">
                Average ATS Score
              </p>

              <h3 className="text-4xl font-bold text-blue-600">
                87
              </h3>
            </div>
          </div>

          <span className="bg-white px-3 py-1 rounded-full text-blue-600 text-sm">
            +12%
          </span>
        </div>
      </div>

      {/* Analyses */}
      <div className="rounded-2xl border border-green-100 bg-green-50 p-5 mb-5">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
              <ClipboardList className="text-green-600" />
            </div>

            <div>
              <p className="text-gray-500">
                Total Analyses
              </p>

              <h3 className="text-4xl font-bold text-green-600">
                24
              </h3>
            </div>
          </div>

          <span className="bg-white px-3 py-1 rounded-full text-green-600 text-sm">
            +8%
          </span>
        </div>
      </div>

      {/* Match Rate */}
      <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
              <Target className="text-purple-600" />
            </div>

            <div>
              <p className="text-gray-500">
                Match Rate
              </p>

              <h3 className="text-4xl font-bold text-purple-600">
                91%
              </h3>
            </div>
          </div>

          <span className="bg-white px-3 py-1 rounded-full text-purple-600 text-sm">
            +15%
          </span>
        </div>
      </div>

      {/* Footer */}
      <button className="mt-8 w-full flex items-center justify-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition">
        View Detailed Analytics
        <ArrowRight size={18} />
      </button>
    </div>
  );
}

export default StatsCard;