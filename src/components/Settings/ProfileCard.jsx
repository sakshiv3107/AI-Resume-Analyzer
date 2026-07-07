import React from "react";
import { UserCircle } from "lucide-react";

function ProfileCard() {
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

          <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center">
            <UserCircle
              size={70}
              className="text-blue-600"
            />
          </div>

          <button className="mt-4 text-blue-600 font-medium hover:underline">
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
              type="text"
              placeholder="Sakshi Vishnoi"
              className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="sakshi@gmail.com"
              className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium">
              Professional Title
            </label>

            <input
              type="text"
              placeholder="Frontend Developer"
              className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="md:col-span-2">

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition">
              Save Changes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProfileCard;