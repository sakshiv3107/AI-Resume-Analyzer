import React, { useState } from "react";
import { UploadCloud, FileText, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function UploadCard({selectedFile,setSelectedFile}) {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowed = [
      "application/pdf",
    ];

    if (!allowed.includes(file.type)) {
      setError("Only PDF or DOC/DOCX files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Maximum file size is 5 MB.");
      return;
    }

    setError("");
    setSelectedFile(file);
  };
  if(selectedFile){
    return (
      <div className="border-2 border-green-200 rounded-2xl p-6 bg-green-50">

      <div className="flex items-center justify-between">

        <div className="flex gap-4 items-center">

          <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center">
            <FileText className="text-red-500" />
          </div>

          <div>
            <h3 className="font-semibold">
              {selectedFile.name}
            </h3>

            <p className="text-sm text-gray-500">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>

            <span className="text-green-600 text-sm font-medium">
              ✓ Ready for Analysis
            </span>
          </div>

        </div>

        <button
          onClick={() => setSelectedFile(null)}
          className="text-red-500 hover:text-red-700"
        >
          <X />
        </button>

      </div>


    </div>
    )
  }
  return (
    <div className="bg-white rounded-3xl  shadow-sm p-8 h-full flex flex-col border-gray-200">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Upload Resume
        </h2>

        <p className="text-gray-500 mt-2">
          Upload your resume in PDF or DOCX format to begin the AI analysis.
        </p>
      </div>

      <input
        type="file"
        id="resume-upload"
        accept=".pdf,.doc,.docx"
        hidden
        onChange={handleFileChange}
      />

      {/* Upload Area */}
      <div
        className="
          border-2
          border-dashed
          border-blue-300
          rounded-2xl
          p-8
          flex
          flex-col
          items-center
          justify-center
          text-center
          hover:border-blue-600
          hover:bg-blue-50/40
          transition-all
          duration-300
          cursor-pointer
        "
      >
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
          <UploadCloud
            size={40}
            className="text-blue-600"
          />
        </div>

        <h3 className="text-2xl font-semibold text-gray-900">
          Drag & Drop Resume
        </h3>

        <p className="text-gray-500 mt-3">
          PDF or DOCX (Maximum 5 MB)
        </p>

        <label
          htmlFor="resume-upload"
          className="
            mt-8
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            transition
            cursor-pointer
          "
        >
          Browse Files
        </label>
      </div>

      {/* Supported Formats */}
      <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
        <FileText className="text-blue-600" size={18} />

        <span>
          Supported formats: PDF, DOC, DOCX
        </span>
      </div>

      {selectedFile && (
        <div className="mt-6 flex items-center justify-between rounded-xl border border-gray-200 p-4 bg-gray-50">
          <div>
            <p className="font-medium">{selectedFile.name}</p>
            <p className="text-sm text-gray-500">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          <button
            onClick={() => setSelectedFile(null)}
            className="text-red-500"
          >
            <X />
          </button>
        </div>
      )}

      {error && (
        <p className="mt-4 text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );  
}

export default UploadCard;