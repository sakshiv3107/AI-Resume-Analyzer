import React from "react";
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
} from "lucide-react";

function KeywordAnalysis() {
  const matchedSkills = [
    "React",
    "JavaScript",
    "HTML",
    "CSS",
    "Tailwind",
    "Git",
    "Node.js",
    "Express",
  ];

  const missingSkills = [
    "Docker",
    "AWS",
    "Kubernetes",
    "GraphQL",
    "MongoDB",
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 h-full">

      {/* Heading */}
      <h2 className="text-2xl font-bold">
        Keyword Analysis
      </h2>

      <p className="text-gray-500 mt-2">
        Compare your resume skills with the job description.
      </p>

      {/* Progress */}
      <div className="mt-8">

        <div className="flex justify-between mb-2">
          <span className="font-medium text-gray-700">
            Overall Match
          </span>

          <span className="text-blue-600 font-semibold">
            38 / 45 Skills
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full"
            style={{ width: "84%" }}
          />
        </div>

      </div>

      {/* Matched */}
      <div className="mt-8">

        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2
            className="text-green-600"
            size={22}
          />

          <h3 className="font-semibold text-lg">
            Matched Skills
          </h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {matchedSkills.map((skill) => (
            <span
              key={skill}
              className="px-4
py-2
rounded-full
bg-green-100
text-green-700
text-sm
font-medium
cursor-pointer
transition-all
duration-300
hover:bg-green-600
hover:text-white
hover:-translate-y-1"
            >
              {skill}
            </span>
          ))}
        </div>

      </div>

      {/* Missing */}
      <div className="mt-8">

        <div className="flex items-center gap-2 mb-4">
          <XCircle
            className="text-red-500"
            size={22}
          />

          <h3 className="font-semibold text-lg">
            Missing Skills
          </h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {missingSkills.map((skill) => (
            <span
              key={skill}
              className="px-4
py-2
rounded-full
bg-red-100
text-red-600
text-sm
font-medium
cursor-pointer
transition-all
duration-300
hover:bg-red-500
hover:text-white
hover:-translate-y-1"
            >
              {skill}
            </span>
          ))}
        </div>

      </div>

      {/* AI Insight */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-4">

        <Lightbulb className="text-blue-600 mt-1" />

        <div>
          <h4 className="font-semibold">
            AI Insight
          </h4>

          <p className="text-gray-600 mt-2">
            Adding the missing skills where relevant to your
            experience could significantly improve your ATS score.
          </p>
        </div>

      </div>

    </div>
  );
}

export default KeywordAnalysis;