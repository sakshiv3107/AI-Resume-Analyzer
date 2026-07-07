import React from "react";
import { Palette, Sun, Moon, Monitor } from "lucide-react";

function AppearanceCard() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">

      <div className="flex items-center gap-3 mb-6">
        <Palette className="text-blue-600" />
        <h2 className="text-2xl font-bold">
          Appearance
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5">

        <button className="border-2 border-blue-600 rounded-2xl p-6 hover:shadow-md transition">
          <Sun className="mx-auto text-yellow-500" size={35} />
          <p className="mt-3 font-semibold">
            Light
          </p>
        </button>

        <button className="border border-gray-200 rounded-2xl p-6 hover:border-blue-600 hover:shadow-md transition">
          <Moon className="mx-auto text-gray-700" size={35} />
          <p className="mt-3 font-semibold">
            Dark
          </p>
        </button>

        <button className="border border-gray-200 rounded-2xl p-6 hover:border-blue-600 hover:shadow-md transition">
          <Monitor className="mx-auto text-blue-600" size={35} />
          <p className="mt-3 font-semibold">
            System
          </p>
        </button>

      </div>

    </div>
  );
}

export default AppearanceCard;