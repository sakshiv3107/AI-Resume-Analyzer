import React from "react";
import { LogOut, Trash2 } from "lucide-react";

function DangerZone() {
  return (
    <div className="bg-white rounded-3xl border border-red-200 shadow-sm p-8">

      <h2 className="text-2xl font-bold text-red-600">
        Danger Zone
      </h2>

      <p className="text-gray-500 mt-2">
        These actions are irreversible. Please proceed carefully.
      </p>

      <div className="flex flex-col md:flex-row gap-5 mt-8">

        <button className="flex-1 flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold transition">
          <Trash2 size={20} />
          Delete Account
        </button>

        <button className="flex-1 flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-100 py-4 rounded-xl font-semibold transition">
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </div>
  );
}

export default DangerZone;