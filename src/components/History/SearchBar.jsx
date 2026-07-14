import React from "react";
import { Search, X } from "lucide-react";

function SearchBar({
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

      <div className="relative">

        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by resume name..."
          className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-12 outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
          >
            <X size={18} />
          </button>
        )}

      </div>

    </div>
  );
}

export default SearchBar;