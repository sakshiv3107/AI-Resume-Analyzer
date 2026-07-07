import React from "react";

import {
  HistoryHero,
  SearchBar,
  FilterTabs,
  HistoryTable,
  EmptyHistory,
} from "../components/History";

function History() {
  // Change this later when backend is connected
  const hasHistory = true;

  return (
    <div className="bg-gray-50 min-h-screen animate-fadeIn">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero */}
        <HistoryHero />

        {/* Search */}
        <div className="mt-8">
          <SearchBar />
        </div>

        {/* Filters */}
        <div className="mt-6">
          <FilterTabs />
        </div>

        {/* History */}
        <div className="mt-8">
          {hasHistory ? <HistoryTable /> : <EmptyHistory />}
        </div>

      </div>
    </div>
  );
}

export default History;