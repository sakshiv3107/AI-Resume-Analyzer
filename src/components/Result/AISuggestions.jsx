import React from "react";
import {
  Sparkles,
  TrendingUp,
  Target,
  PenSquare,
  ArrowRight,
} from "lucide-react";

function AISuggestions() {
  const suggestions = [
    {
      icon: Sparkles,
      title: "Professional Summary",
      description:
        "Your summary is too generic. Mention your experience, key technologies and career objective.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: TrendingUp,
      title: "Quantify Achievements",
      description:
        "Use numbers to demonstrate impact, such as percentages, revenue or project outcomes.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Target,
      title: "Missing Keywords",
      description:
        "Consider adding Docker, AWS and GraphQL where they accurately reflect your experience.",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      icon: PenSquare,
      title: "Grammar & Readability",
      description:
        "Minor grammar improvements and shorter sentences can make your resume more readable.",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 h-full">

      <h2 className="text-2xl font-bold">
        AI Suggestions
      </h2>

      <p className="text-gray-500 mt-2">
        AI-powered recommendations to improve your resume.
      </p>

      <div className="mt-8 space-y-5">

        {suggestions.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between">

                <div className="flex gap-4">

                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color} p-3`}
                  >
                    <Icon size={22} />
                  </div>

                  <div>

                    <h3 className="font-semibold text-lg">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 mt-2">
                      {item.description}
                    </p>

                  </div>

                </div>

                <button className="self-start flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700">
                  Improve
                  <ArrowRight size={18} />
                </button>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default AISuggestions;