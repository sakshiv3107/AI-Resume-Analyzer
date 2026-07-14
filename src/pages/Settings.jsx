import React, { useEffect, useState } from "react";

import {
  SettingsHero,
  Sidebar,
  ProfileCard,
  NotificationCard,
  AppearanceCard,
  SecurityCard,
  DangerZone,
} from "../components/Settings";

import { useAuth } from "../context/AuthContext";
import { getProfile } from "../services/profileService";

function Settings() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadProfile = async () => {
    const { data, error } = await getProfile(user.id);

    if (error) {
      console.error(error);
    } else {
      setProfile(data);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen animate-fadeIn">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <SettingsHero />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">

          {/* Sidebar */}
          <div className="lg:col-span-3">
            <Sidebar />
          </div>

          {/* Content */}
          <div className="lg:col-span-9 space-y-8">

            <ProfileCard
              profile={profile}
              refreshProfile={loadProfile}
            />

            <NotificationCard />

            <AppearanceCard />

        

            <DangerZone />

          </div>

        </div>

      </div>
    </div>
  );
}

export default Settings;