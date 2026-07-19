import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getScoreHistory } from "../../services/historyService";

const BREAKDOWN_LABELS = {
  skills: "Skills",
  experience: "Experience",
  education: "Education",
  projects: "Projects",
  keywords: "Keywords",
  formatting: "Formatting",
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

function ScoreHistory({ userId, resumeHash }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId || !resumeHash) return;

    (async () => {
      setLoading(true);
      const { data, error } = await getScoreHistory(userId, resumeHash);
      if (!error && data) setHistory(data);
      setLoading(false);
    })();
  }, [userId, resumeHash]);

  if (loading) return null;

  // Need at least 2 points for a trend to mean anything
  if (history.length < 2) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Score History</h3>
        <p className="text-sm text-gray-500">
          Re-analyze this resume after making edits to start tracking your progress over time.
        </p>
      </div>
    );
  }

  const chartData = history.map((h) => ({
    date: formatDate(h.created_at),
    atsScore: h.ats_score,
    matchPercentage: h.match_percentage,
  }));

  const latest = history[history.length - 1];
  const previous = history[history.length - 2];
  const scoreDelta = latest.ats_score - previous.ats_score;

  const breakdownDeltas = Object.keys(BREAKDOWN_LABELS)
    .map((key) => {
      const curr = latest.analysis?.ats_breakdown?.[key] ?? 0;
      const prev = previous.analysis?.ats_breakdown?.[key] ?? 0;
      return { key, label: BREAKDOWN_LABELS[key], delta: curr - prev };
    })
    .filter((d) => d.delta !== 0);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Score History</h3>
        <span
          className={`text-sm font-semibold ${
            scoreDelta > 0
              ? "text-green-600"
              : scoreDelta < 0
              ? "text-red-500"
              : "text-gray-400"
          }`}
        >
          {scoreDelta > 0 ? "+" : ""}
          {scoreDelta} since last version
        </span>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="atsScore"
            name="ATS Score"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="matchPercentage"
            name="Match %"
            stroke="#16a34a"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {breakdownDeltas.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
          {breakdownDeltas.map((d) => (
            <span
              key={d.key}
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                d.delta > 0
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {d.label} {d.delta > 0 ? "+" : ""}
              {d.delta}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default ScoreHistory;