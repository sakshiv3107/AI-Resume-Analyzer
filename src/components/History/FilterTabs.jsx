import React from "react";

function FilterTabs({
  selectedFilter,
  setSelectedFilter,
  history = [],
}) {
  const filters = [
    {
      label: "All",
      value: "all",
      count: history.length,
    },
    {
      label: "Recent",
      value: "recent",
      count: history.filter((item) => {
        const diff =
          (Date.now() - new Date(item.created_at)) /
          (1000 * 60 * 60 * 24);

        return diff <= 7;
      }).length,
    },
    {
      label: "High Score",
      value: "high",
      count: history.filter(
        (item) => item.ats_score >= 80
      ).length,
    },
    {
      label: "Needs Improvement",
      value: "low",
      count: history.filter(
        (item) => item.ats_score < 80
      ).length,
    },
  ];

  return (
    <div className="flex flex-wrap gap-3">

      {filters.map((filter) => (

        <button
          key={filter.value}
          onClick={() => setSelectedFilter(filter.value)}
          className={`px-5 py-2 rounded-full font-medium transition flex items-center gap-2
            ${
              selectedFilter === filter.value
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-200 hover:bg-blue-50 hover:text-blue-600"
            }`}
        >
          <span>{filter.label}</span>

          <span
            className={`text-xs px-2 py-0.5 rounded-full
            ${
              selectedFilter === filter.value
                ? "bg-white/20"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {filter.count}
          </span>
        </button>

      ))}

    </div>
  );
}

export default FilterTabs;