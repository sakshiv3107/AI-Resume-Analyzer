import React from "react";

import {
  SettingsHero,
  Sidebar,
  ProfileCard,
  NotificationCard,
  AppearanceCard,
  SecurityCard,
  DangerZone,
} from "../components/Settings";

function Settings() {
  return (
    <div className="bg-gray-50 min-h-screen animate-fadeIn">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <SettingsHero />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">

          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <Sidebar />
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-9 space-y-8">

            <ProfileCard />

            <NotificationCard />

            <AppearanceCard />

            <SecurityCard />

            <DangerZone />

          </div>

        </div>

      </div>
    </div>
  );
}

export default Settings;