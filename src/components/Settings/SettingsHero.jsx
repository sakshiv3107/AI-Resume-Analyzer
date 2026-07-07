import React from "react";
import { Settings } from "lucide-react";

function SettingsHero() {
  return (
    <section>
      <div className="flex items-center gap-4">

        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
          <Settings className="text-blue-600" size={28} />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Settings
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your account and personalize your ResumeIQ AI experience.
          </p>
        </div>

      </div>
    </section>
  );
}

export default SettingsHero;