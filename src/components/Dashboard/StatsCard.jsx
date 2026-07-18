import React, { useEffect, useState } from "react";
import {
  FileSearch,
  ClipboardList,
  Target,
  TrendingUp,
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
      <div className="h-full flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!stats || stats.totalAnalyses === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Average ATS Score", icon: FileSearch },
          { label: "Total Analyses", icon: ClipboardList },
          { label: "Average Match Rate", icon: Target },
        ].map((stat, i) => (
          <div key={i} className="rounded-xl border border-gray-100 bg-gray-50 p-5 flex items-center gap-4 opacity-70">
            <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
              <stat.icon className="text-gray-400" size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-400">-</h3>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

      {/* ATS */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
            <FileSearch className="text-blue-600" size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Average ATS Score
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-gray-900">
                {stats.averageATS}%
              </h3>
              <span className="flex items-center text-xs font-medium text-green-600">
                <TrendingUp size={12} className="mr-1" />
                +2.4%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
            <ClipboardList className="text-green-600" size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Total Analyses
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-gray-900">
                {stats.totalAnalyses}
              </h3>
              <span className="flex items-center text-xs font-medium text-green-600">
                <TrendingUp size={12} className="mr-1" />
                +3
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Match */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
            <Target className="text-purple-600" size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Average Match Rate
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-gray-900">
                {stats.averageMatch}%
              </h3>
              <span className="flex items-center text-xs font-medium text-green-600">
                <TrendingUp size={12} className="mr-1" />
                +1.2%
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default StatsCard;