import React from "react";
import { History } from "lucide-react";

function HistoryHero() {
  return (
    <section>
      <div className="flex items-center gap-4">

        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
          <History className="text-blue-600" size={28} />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Resume History
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage all your previous AI resume analyses.
          </p>
        </div>

      </div>
    </section>
  );
}

export default HistoryHero;