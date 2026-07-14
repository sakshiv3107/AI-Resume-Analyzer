import React from "react";
import { AlertTriangle } from "lucide-react";

function DeleteAccountModal({
  open,
  onClose,
  onConfirm,
  loading,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

      <div className="bg-white rounded-3xl w-full max-w-md p-8 animate-fadeIn">

        <div className="flex justify-center">

          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle
              size={32}
              className="text-red-600"
            />
          </div>

        </div>

        <h2 className="text-2xl font-bold text-center mt-6">
          Delete Account?
        </h2>

        <p className="text-gray-500 text-center mt-3">
          This will permanently delete your account and all your resume
          analyses. This action cannot be undone.
        </p>

        <div className="flex gap-4 mt-8">

          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-300 font-semibold hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteAccountModal;