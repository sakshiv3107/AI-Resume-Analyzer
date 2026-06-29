import React from "react";

function Feature() {
  return (
    <section className="py-18 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-blue-500 py-2 text-xs uppercase text-center">
          THE METHODOLOGY
        </p>

        <h1 className="text-4xl font-bold text-center mb-5">
          Engineered for Precision
        </h1>

        <p className="text-lg text-gray-600 text-center mb-16">
          Our AI engine dissects every bullet point to ensure your resume
          navigates complex recruitment ecosystems.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          
          {/* Card 1 */}
          <div
            className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm
            hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-center mb-5">
              <div className="w-24 h-24 rounded-full border-4 border-blue-600 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold">85</p>
                  <p className="text-xs text-gray-500">SCORE</p>
                </div>
              </div>
            </div>

            <h3 className="text-3xl font-bold mt-6 text-center">
              ATS Scoring
            </h3>

            <p className="text-gray-600 mt-4 leading-7 text-center">
              Predict how algorithms rank your profile against job
              descriptions.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm
            hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                CHECK PYTHON
              </span>

              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                CHECK REACT
              </span>

              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                KUBERNETES
              </span>

              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                CHECK MONGODB
              </span>
            </div>

            <h3 className="text-3xl font-bold mt-6">
              Keyword Matching
            </h3>

            <p className="text-gray-600 mt-4 leading-7">
              Identify critical skills and missing terminology based on target
              industry standards.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm
            hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
          >
            <div className="space-y-3 mb-6">
              <div className="bg-gray-100 rounded px-3 py-2 text-xs text-gray-500">
                <p>"I was responsible for the sales team."</p>
              </div>

              <div className="bg-gray-100 rounded px-3 py-2 text-xs text-blue-500">
                <p>
                  "Spearheaded a high-performance sales unit, driving a 40% YOY
                  revenue increase."
                </p>
              </div>
            </div>

            <h3 className="text-3xl font-bold mt-6">
              AI Rewriting
            </h3>

            <p className="text-gray-600 mt-4 leading-7">
              Transform passive descriptions into action-oriented,
              quantifiable results.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Feature;