import React from "react";
import {
  Clock3,
  FileText,
  Eye,
  Trash2,
  ArrowRight,
} from "lucide-react";

function RecentAnalysis() {
  const hasHistory = false;

  const analyses = [
    {
      id: 1,
      name: "Software_Engineer_Resume.pdf",
      score: 92,
      date: "2 hours ago",
    },
    {
      id: 2,
      name: "Frontend_Resume.pdf",
      score: 88,
      date: "Yesterday",
    },
    {
      id: 3,
      name: "Product_Manager.pdf",
      score: 95,
      date: "3 days ago",
    },
  ];

  if (!hasHistory) {
    return (
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 h-full flex flex-col ">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Clock3 className="text-blue-600" size={22} />
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

        {/* Empty State */}
        <div className="text-center py-10">

    <Clock3
        size={35}
        className="mx-auto text-blue-500"
    />

    <h3 className="mt-4 font-semibold">
        No Recent Analysis
    </h3>

    <p className="text-gray-500 mt-2">
        
Upload your first resume and start analyzing it with
            AI. Your analysis history will be displayed here.
    </p>

</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 mt-8">
      {/* Heading */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">
            Recent Analysis
          </h2>

          <p className="text-gray-500 mt-1">
            Review your latest resume analyses.
          </p>
        </div>

        <button className="flex items-center gap-2 text-blue-600 font-medium hover:underline">
          View All
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Analysis Cards */}
      <div className="space-y-4">
        {analyses.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-2xl p-5 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">
                  {item.name}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  {item.date}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    ATS Score
                  </p>

                  <h3 className="text-2xl font-bold text-blue-600">
                    {item.score}
                  </h3>
                </div>

                <button className="w-10 h-10 rounded-xl bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition">
                  <Eye
                    size={18}
                    className="text-blue-600"
                  />
                </button>

                <button className="w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center transition">
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