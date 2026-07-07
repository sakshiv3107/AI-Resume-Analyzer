import React from "react";
import { Bell } from "lucide-react";

function NotificationCard() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">

      <div className="flex items-center gap-3 mb-6">
        <Bell className="text-blue-600" />
        <h2 className="text-2xl font-bold">
          Notifications
        </h2>
      </div>

      <div className="space-y-5">

        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Resume Analysis</h3>
            <p className="text-sm text-gray-500">
              Notify when analysis is completed.
            </p>
          </div>

          <input
            type="checkbox"
            defaultChecked
            className="w-5 h-5 accent-blue-600"
          />
        </div>

        <hr />

        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Weekly Report</h3>
            <p className="text-sm text-gray-500">
              Receive weekly progress updates.
            </p>
          </div>

          <input
            type="checkbox"
            defaultChecked
            className="w-5 h-5 accent-blue-600"
          />
        </div>

        <hr />

        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Product Updates</h3>
            <p className="text-sm text-gray-500">
              Get notified about new AI features.
            </p>
          </div>

          <input
            type="checkbox"
            className="w-5 h-5 accent-blue-600"
          />
        </div>

      </div>

    </div>
  );
}

export default NotificationCard;