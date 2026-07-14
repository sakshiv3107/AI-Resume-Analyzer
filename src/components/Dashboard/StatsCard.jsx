import React, { useEffect, useState } from "react";
import {
  FileSearch,
  ClipboardList,
  Target,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { getDashboardStats } from "../../services/historyService";

function StatsCard() {
  const { user } = useAuth();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  async function loadStats() {
    const { data, error } = await getDashboardStats(user.id);

    if (error) {
      console.error(error);
    } else {
      setStats(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 h-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!stats || stats.totalAnalyses === 0) {
    return (
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 h-full flex flex-col">

        <h2 className="text-2xl font-bold">
          Quick Stats
        </h2>

        <p className="text-gray-500 mt-2">
          Your resume analysis overview will appear here.
        </p>

        <div className="text-center py-12">

          <FileSearch
            size={40}
            className="mx-auto text-blue-500"
          />

          <h3 className="mt-4 font-semibold">
            No Stats Yet
          </h3>

          <p className="text-gray-500 mt-2">
            Analyze your first resume to unlock statistics.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 h-full">

      <h2 className="text-2xl font-bold">
        Quick Stats
      </h2>

      <p className="text-gray-500 mt-2 mb-8">
        Overview of your resume analyses.
      </p>

      {/* ATS */}

      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 mb-5">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
            <FileSearch className="text-blue-600" />
          </div>

          <div>

            <p className="text-gray-500">
              Average ATS Score
            </p>

            <h3 className="text-4xl font-bold text-blue-600">
              {stats.averageATS}%
            </h3>

          </div>

        </div>

      </div>

      {/* Total */}

      <div className="rounded-2xl border border-green-100 bg-green-50 p-5 mb-5">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
            <ClipboardList className="text-green-600" />
          </div>

          <div>

            <p className="text-gray-500">
              Total Analyses
            </p>

            <h3 className="text-4xl font-bold text-green-600">
              {stats.totalAnalyses}
            </h3>

          </div>

        </div>

      </div>

      {/* Match */}

      <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
            <Target className="text-purple-600" />
          </div>

          <div>

            <p className="text-gray-500">
              Average Match Rate
            </p>

            <h3 className="text-4xl font-bold text-purple-600">
              {stats.averageMatch}%
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StatsCard;