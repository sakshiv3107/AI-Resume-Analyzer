import React from "react";
import { Lock } from "lucide-react";

function SecurityCard() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">

      <div className="flex items-center gap-3 mb-6">
        <Lock className="text-blue-600" />
        <h2 className="text-2xl font-bold">
          Security
        </h2>
      </div>

      <div className="grid gap-6">

        <div>
          <label className="font-medium">
            Current Password
          </label>

          <input
            type="password"
            className="w-full mt-2 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="font-medium">
            New Password
          </label>

          <input
            type="password"
            className="w-full mt-2 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="font-medium">
            Confirm Password
          </label>

          <input
            type="password"
            className="w-full mt-2 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
          Update Password
        </button>

      </div>

    </div>
  );
}

export default SecurityCard;