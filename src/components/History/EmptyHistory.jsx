import React from "react";
import { FileSearch } from "lucide-react";
import { Link } from "react-router-dom";

function EmptyHistory() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-16 text-center">

      <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto">

        <FileSearch
          size={42}
          className="text-blue-600"
        />

      </div>

      <h2 className="text-3xl font-bold mt-8">
        No Resume Analysis Yet
      </h2>

      <p className="text-gray-500 mt-4 max-w-xl mx-auto leading-7">
        Your previous resume analyses will appear here. Upload your
        first resume and start tracking your ATS improvements.
      </p>

      <Link to="/dashboard">

        <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition">
          Analyze Your First Resume
        </button>

      </Link>

    </div>
  );
}

export default EmptyHistory;