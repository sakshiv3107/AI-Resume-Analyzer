import React from "react";
import {
  Download,
  ExternalLink,
} from "lucide-react";

function ResumePreview({ file, fileUrl }) {
  const pdfSrc = file
  ? URL.createObjectURL(file)
  : fileUrl;

  const fileName = file?.name || fileUrl?.split("/").pop() || "Resume.pdf";

const fileSize = file
  ? `${(file.size / 1024).toFixed(0)} KB`
  : "--";

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6  h-full flex flex-col">

      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Resume Preview
        </h2>

        <p className="text-gray-500 mt-2">
          Review your uploaded resume.
        </p>
      </div>

      {/* Preview */}
      <div className="flex-1 border border-gray-200 rounded-2xl overflow-auto">

        {fileUrl ? (
          <iframe
            src={`${pdfSrc}#toolbar=0&navpanes=0&view=FitH`}
            title="Resume Preview"
            className="w-full h-152.5 border-none rounded-2xl"
          />
        ) : (
          <div className="h-162.5 flex items-center justify-center text-gray-500">
            No resume uploaded.
          </div>
        )}

      </div>

      {/* Details */}
      {pdfSrc && (
        <div className="grid grid-cols-3 gap-4 mt-8">

          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500">Type</p>
            <h3 className="font-semibold">
              PDF
            </h3>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500">Name</p>
            <h3 className="font-semibold truncate">
              {fileName}
            </h3>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500">Size</p>
            <h3 className="font-semibold">
              {fileSize}
            </h3>
          </div>

        </div>
      )}

      {/* Buttons */}
      {fileUrl && (
        <div className="flex gap-4 mt-8">

          <a
            href={fileUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 border border-gray-300 rounded-xl py-3 font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            <ExternalLink size={18} />
            Open
          </a>

          <a
            href={pdfSrc}
            download={fileName}
            className="flex-1 bg-blue-600 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
          >
            <Download size={18} />
            Download
          </a>

        </div>
      )}

    </div>
  );
}

export default ResumePreview;