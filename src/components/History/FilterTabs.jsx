import React from "react";

function FilterTabs() {
  const filters = [
    "All",
    "Recent",
    "High Score",
    "Needs Improvement",
  ];

  return (
    <div className="flex flex-wrap gap-3">

      {filters.map((filter, index) => (

        <button
          key={index}
          className={`px-5 py-2 rounded-full font-medium transition
            ${
              index === 0
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-200 hover:bg-blue-50 hover:text-blue-600"
            }`}
        >
          {filter}
        </button>

      ))}

    </div>
  );
}

export default FilterTabs;