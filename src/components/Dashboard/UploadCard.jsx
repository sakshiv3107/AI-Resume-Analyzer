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

  return (
    <div className="p-6 h-full flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Heading */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <FileText size={20} className="text-blue-600" />
          Upload Resume
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          PDF or DOCX (Max 5MB)
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
      {!selectedFile ? (
        <label
          htmlFor="resume-upload"
          className="
            border-2
            border-dashed
            border-blue-300
            rounded-xl
            p-6
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
            flex-1
          "
        >
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
            <UploadCloud
              size={24}
              className="text-blue-600"
            />
          </div>

          <h3 className="text-sm font-semibold text-gray-900">
            Click to Browse
          </h3>

          <p className="text-xs text-gray-500 mt-1">
            or drag and drop your file here
          </p>
        </label>
      ) : (
        <div className="border border-green-200 rounded-xl p-6 bg-green-50 flex flex-col justify-center flex-1">
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <FileText className="text-red-500" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-900">
                  {selectedFile.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <span className="text-green-600 text-xs font-medium flex items-center gap-1 mt-1">
                  ✓ Ready for Analysis
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm border border-gray-200 transition"
            >
              <X size={16} />
            </button>
          </div>
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