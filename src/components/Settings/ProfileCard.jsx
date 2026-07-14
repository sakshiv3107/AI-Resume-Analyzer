import React, { useEffect, useState } from "react";
import { UserCircle } from "lucide-react";

import {
  updateProfile,
} from "../../services/profileService";

function ProfileCard({
  profile,
  refreshProfile,
}) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    bio: "",
    github: "",
    linkedin: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        email: profile.email || "",
        bio: profile.bio || "",
        github: profile.github || "",
        linkedin: profile.linkedin || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);

    const { error } = await updateProfile(profile.id, {
      full_name: formData.full_name,
      bio: formData.bio,
      github: formData.github,
      linkedin: formData.linkedin,
    });

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    await refreshProfile();

    alert("Profile updated successfully!");
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">

      <h2 className="text-2xl font-bold">
        Profile
      </h2>

      <p className="text-gray-500 mt-2">
        Update your personal information.
      </p>

      <div className="flex flex-col lg:flex-row gap-8 mt-8">

        {/* Avatar */}

        <div className="flex flex-col items-center">

          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="Avatar"
              className="w-28 h-28 rounded-full object-cover"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center">
              <UserCircle
                size={70}
                className="text-blue-600"
              />
            </div>
          )}

          <button
            className="mt-4 text-blue-600 font-medium hover:underline"
          >
            Change Photo
          </button>

        </div>

        {/* Form */}

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>

            <label className="text-sm font-medium">
              Full Name
            </label>

            <input
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <div>

            <label className="text-sm font-medium">
              Email
            </label>

            <input
              value={formData.email}
              disabled
              className="w-full mt-2 bg-gray-100 border border-gray-300 rounded-xl px-4 py-3"
            />

          </div>

          <div className="md:col-span-2">

            <label className="text-sm font-medium">
              Bio
            </label>

            <textarea
              rows={4}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <div>

            <label className="text-sm font-medium">
              GitHub
            </label>

            <input
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/username"
              className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <div>

            <label className="text-sm font-medium">
              LinkedIn
            </label>

            <input
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
              className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <div className="md:col-span-2">

            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProfileCard;