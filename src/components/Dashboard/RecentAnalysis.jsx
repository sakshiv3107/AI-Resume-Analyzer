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

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 h-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!analyses.length) {
    return (
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 h-full">

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
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 h-full">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold">
            Recent Analysis
          </h2>

          <p className="text-gray-500 mt-1">
            Your latest AI resume analyses.
          </p>

        </div>

        <button
          onClick={() => navigate("/history")}
          className="flex items-center gap-2 text-blue-600 font-medium hover:underline"
        >
          View All
          <ArrowRight size={18} />
        </button>

      </div>

      <div className="space-y-4">

        {analyses.map((item) => (

          <div
            key={item.id}
            className="border border-gray-200 rounded-2xl p-5 hover:shadow-md transition"
          >

            <div className="flex justify-between items-center">

              <div>

                <h3 className="font-semibold text-lg">
                  {item.resumes.file_name}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  {new Date(item.created_at).toLocaleDateString()}
                </p>

              </div>

              <div className="flex items-center gap-6">

                <div className="text-center">

                  <p className="text-xs text-gray-500">
                    ATS Score
                  </p>

                  <h3 className="text-2xl font-bold text-blue-600">
                    {item.ats_score}%
                  </h3>

                </div>

                <button
                  onClick={() => {
                    console.log("Navigating to:", `/result/${item.id}`);
                    navigate(`/result/${item.id}`);
                  }}
                  className="w-10 h-10 rounded-xl bg-blue-50 hover:bg-blue-100 flex items-center justify-center"
                >
                  <Eye size={18} className="text-blue-600" />
                </button>

                <button
                  onClick={() =>
                    handleDelete(item.id)
                  }
                  className="w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center"
                >
                  <Trash2
                    size={18}
                    className="text-red-500"
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