import React from "react";
import { Eye, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

function HistoryTable({ history = [] }) {
  const navigate = useNavigate();
  const getStatus = (score) => {
    if (score >= 90)
      return {
        label: "Excellent",
        color: "bg-green-100 text-green-700",
      };

    if (score >= 80)
      return {
        label: "Good",
        color: "bg-blue-100 text-blue-700",
      };

    return {
      label: "Needs Improvement",
      color: "bg-yellow-100 text-yellow-700",
    };
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-50">

          <tr className="text-left">

            <th className="px-6 py-4">Resume</th>

            <th className="px-6 py-4">ATS Score</th>

            <th className="px-6 py-4">Date</th>

            <th className="px-6 py-4">Status</th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {history.map((item) => {
            const status = getStatus(item.ats_score);

            return (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 transition"
              >

                {/* Resume */}
                <td className="px-6 py-5 font-medium">
                  {item.resumes?.file_name}
                </td>

                {/* ATS */}
                <td className="px-6 py-5 font-semibold text-blue-600">
                  {item.ats_score}%
                </td>

                {/* Date */}
                <td className="px-6 py-5 text-gray-500">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>

                {/* Status */}
                <td className="px-6 py-5">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
                  >
                    {status.label}
                  </span>

                </td>

                {/* Actions */}
                <td className="px-6 py-5">

                  <div className="flex justify-center gap-3">

                    {/* View Resume */}
                    <button
                      onClick={() => navigate(`/result/${item.id}`)}
                      className="p-2 rounded-lg border hover:bg-gray-100"
                    >
                      <Eye size={18} />
                    </button>
                    {/* Download Resume */}
                    <a
                      href={item.resumes?.file_url}
                      download
                      className="p-2 rounded-lg border hover:bg-gray-100"
                    >
                      <Download size={18} />
                    </a>

                  </div>

                </td>

              </tr>
            );
          })}

        </tbody>

      </table>

    </div>
  );
}

export default HistoryTable;