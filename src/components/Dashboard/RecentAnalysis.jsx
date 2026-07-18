import React, { useEffect, useState } from "react";
import {
  Clock3,
  Eye,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getRecentAnalyses,
  deleteAnalysis,
} from "../../services/historyService";

function RecentAnalysis() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadRecentAnalyses();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadRecentAnalyses = async () => {
    setLoading(true);

    const { data, error } = await getRecentAnalyses(user.id);

    if (error) {
      console.error(error);
    } else {
      setAnalyses(data);
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this analysis?"
    );

    if (!confirmDelete) return;

    await deleteAnalysis(id);

    loadRecentAnalyses();
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "bg-green-100 text-green-700 border-green-200";
    if (score >= 60) return "bg-blue-100 text-blue-700 border-blue-200";
    return "bg-red-100 text-red-700 border-red-200";
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!analyses.length) {
    return (
      <div className="h-full">

        <div className="flex items-center gap-3 mb-8">

          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Clock3 className="text-blue-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Recent Analysis
            </h2>

            <p className="text-gray-500">
              Your previous resume analyses will appear here.
            </p>
          </div>

        </div>

        <div className="text-center py-12">

          <Clock3
            className="mx-auto text-blue-500"
            size={40}
          />

          <h3 className="font-semibold mt-4">
            No Recent Analysis
          </h3>

          <p className="text-gray-500 mt-2">
            Upload your first resume to start building your analysis history.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="h-full">

      <div className="flex justify-between items-end mb-4">

        <div>

          <h2 className="text-lg font-bold text-gray-900">
            Recent Analysis
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Your latest AI resume analyses.
          </p>

        </div>

        <button
          onClick={() => navigate("/history")}
          className="flex items-center gap-1 text-sm text-blue-600 font-medium hover:underline"
        >
          View All
          <ArrowRight size={16} />
        </button>

      </div>

      <div className="space-y-3">

        {analyses.map((item) => (

          <div
            key={item.id}
            className="border border-gray-200 bg-white p-4 rounded-xl hover:shadow-md transition flex justify-between items-center"
          >

            <div className="flex flex-col">
              <h3 className="font-semibold text-gray-900 text-sm">
                {item.resumes.file_name}
              </h3>

              <p className="text-gray-500 text-xs mt-1">
                {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-4">

              <div className={`px-3 py-1 rounded-full border text-sm font-bold ${getScoreColor(item.ats_score)}`}>
                {item.ats_score}%
              </div>

              <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                <button
                  onClick={() => {
                    navigate(`/result/${item.id}`);
                  }}
                  className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-blue-50 flex items-center justify-center transition"
                  title="View"
                >
                  <Eye size={16} className="text-gray-500 hover:text-blue-600" />
                </button>

                <button
                  onClick={() =>
                    handleDelete(item.id)
                  }
                  className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-red-50 flex items-center justify-center transition"
                  title="Delete"
                >
                  <Trash2
                    size={16}
                    className="text-gray-500 hover:text-red-500"
                  />
                </button>
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RecentAnalysis;