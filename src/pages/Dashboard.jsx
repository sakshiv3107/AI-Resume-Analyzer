import React from "react";
import {
  DashboardHero,
  UploadCard,
  JobDescription,
  StatsCard,
  RecentAnalysis,
} from "../components/Dashboard";

function Dashboard() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero */}
        <DashboardHero />

        {/* Upload + Job Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          <UploadCard />

          <JobDescription />

        </div>

        {/* Analyze Button */}
        <div className="flex justify-center mt-8">
          <button
            className="
            w-full
             bg-linear-to-r
              from-blue-600
              to-blue-500
              text-white
              rounded-2xl
              py-4
              font-semibold
              shadow-lg
              hover:scale-[1.02]
              transition-all
              mb-12
            "

          >
            ✨ Analyze Resume →
          </button>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

            <StatsCard />
            <RecentAnalysis />

        </div>

      </div>
    </div>
  );
}

export default Dashboard;