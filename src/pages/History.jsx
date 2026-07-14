import React from "react";
import { useEffect, useState } from "react";
import { getHistory } from "../services/historyService";
import { useAuth } from "../context/AuthContext";


import {
  HistoryHero,
  SearchBar,
  FilterTabs,
  HistoryTable,
  EmptyHistory,
} from "../components/History";

function History() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user]);

  async function loadHistory() {
    const { data, error } = await getHistory(user.id);

    if (error) {
      console.error(error);
      return;
    }

    setHistory(data);
  }
  const hasHistory = history.length > 0;

const filteredHistory = history.filter((item) => {
  // Search
  const matchesSearch =
    item.resumes?.file_name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

  // Filter
  let matchesFilter = true;

  switch (selectedFilter) {
    case "recent":
      matchesFilter =
        (Date.now() - new Date(item.created_at)) /
          (1000 * 60 * 60 * 24) <=
        7;
      break;

    case "high":
      matchesFilter = item.ats_score >= 80;
      break;

    case "low":
      matchesFilter = item.ats_score < 80;
      break;

    default:
      matchesFilter = true;
  }

  return matchesSearch && matchesFilter;
});

  return (
    <div className="bg-gray-50 min-h-screen animate-fadeIn">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero */}
        <HistoryHero />

        {/* Search */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Filters */}
        <div className="mt-6">
          <FilterTabs
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            history={history}
          />
        </div>

        {/* History */}
        <div className="mt-8">
          {hasHistory ? <HistoryTable history={filteredHistory} /> : <EmptyHistory />}
        </div>

      </div>
    </div>
  );
}

export default History;