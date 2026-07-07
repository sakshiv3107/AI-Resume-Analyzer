import React from "react";
import {
  User,
  Bell,
  Palette,
  Shield,
  TriangleAlert,
} from "lucide-react";

function Sidebar() {
  const menu = [
    {
      icon: User,
      title: "Profile",
      active: true,
    },
    {
      icon: Bell,
      title: "Notifications",
    },
    {
      icon: Palette,
      title: "Appearance",
    },
    {
      icon: Shield,
      title: "Security",
    },
    {
      icon: TriangleAlert,
      title: "Danger Zone",
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-4">

      <h2 className="text-lg font-semibold mb-5">
        Navigation
      </h2>

      <div className="space-y-2">

        {menu.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={index}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition

              ${
                item.active
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }
              `}
            >
              <Icon size={20} />

              {item.title}
            </button>
          );
        })}

      </div>

    </div>
  );
}

export default Sidebar;