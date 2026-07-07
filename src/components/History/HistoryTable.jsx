import React from "react";
import { Eye, Download } from "lucide-react";

function HistoryTable() {
  const history = [
    {
      name: "Frontend_Resume.pdf",
      score: 92,
      date: "Today",
      status: "Excellent",
    },
    {
      name: "Backend_Resume.pdf",
      score: 85,
      date: "Yesterday",
      status: "Good",
    },
    {
      name: "Data_Analyst.pdf",
      score: 71,
      date: "10 Jul 2026",
      status: "Average",
    },
  ];

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

          {history.map((item, index) => (

            <tr
              key={index}
              className="border-t hover:bg-gray-50 transition"
            >

              <td className="px-6 py-5 font-medium">
                {item.name}
              </td>

              <td className="px-6 py-5 font-semibold text-blue-600">
                {item.score}
              </td>

              <td className="px-6 py-5 text-gray-500">
                {item.date}
              </td>

              <td className="px-6 py-5">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                  ${
                    item.score >= 90
                      ? "bg-green-100 text-green-700"
                      : item.score >= 80
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>

              </td>

              <td className="px-6 py-5">

                <div className="flex justify-center gap-3">

                  <button className="p-2 rounded-lg border hover:bg-gray-100">
                    <Eye size={18} />
                  </button>

                  <button className="p-2 rounded-lg border hover:bg-gray-100">
                    <Download size={18} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default HistoryTable;