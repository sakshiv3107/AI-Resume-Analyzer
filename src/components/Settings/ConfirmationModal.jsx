import React from "react";
import { AlertTriangle } from "lucide-react";

function ConfirmationModal({
  open,
  title,
  message,
  confirmText,
  confirmColor = "blue",
  loading,
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  const buttonColor =
    confirmColor === "red"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-blue-600 hover:bg-blue-700";

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">

      <div className="bg-white rounded-3xl w-full max-w-md p-8">

        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="text-red-600" size={32} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mt-6">
          {title}
        </h2>

        <p className="text-gray-500 text-center mt-3">
          {message}
        </p>

        <div className="flex gap-4 mt-8">

          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-3 rounded-xl text-white font-semibold transition ${buttonColor}`}
          >
            {loading ? "Please wait..." : confirmText}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ConfirmationModal;