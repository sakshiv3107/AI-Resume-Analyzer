import React from "react";
import { Download, ExternalLink, FileText } from "lucide-react";

function ResumePreview({ file, fileUrl }) {
  const pdfSrc = file ? URL.createObjectURL(file) : fileUrl;
  const fileName = file?.name || fileUrl?.split("/").pop() || "Resume.pdf";
  const fileSize = file ? `${(file.size / 1024).toFixed(0)} KB` : "PDF";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      <h2 className="text-sm font-bold text-gray-800 mb-3">Uploaded Resume</h2>
      
      {pdfSrc ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3">
            <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center shrink-0">
              <FileText className="text-blue-600" size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-gray-900 truncate" title={fileName}>
                {fileName}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">{fileSize}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <a
              href={pdfSrc}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 bg-blue-50 text-blue-700 rounded-lg py-2 text-xs font-semibold hover:bg-blue-100 transition"
            >
              <ExternalLink size={14} />
              Open Full
            </a>
            <a
              href={pdfSrc}
              download={fileName}
              className="flex items-center justify-center gap-1.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-2 text-xs font-semibold hover:bg-gray-100 transition"
            >
              <Download size={14} />
              Download
            </a>
          </div>
        </div>
      ) : (
        <div className="py-6 flex flex-col items-center justify-center text-gray-400">
          <FileText size={32} className="mb-2 opacity-50" />
          <p className="text-xs">No resume uploaded.</p>
        </div>
      )}
    </div>
  );
}

export default ResumePreview;