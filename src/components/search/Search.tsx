"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    // Implement search logic
    console.log("Searching for:", searchQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
      <div className="relative flex items-center gap-2 flex-1 max-[1130px]:hidden">
          <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded"
          />
          {searchQuery && (
              <FontAwesomeIcon
                  icon={faTimes}
                  className="absolute top-1/2 left-32 transform -translate-y-1/2 text-gray-400 pl-20 cursor-pointer"
                  onClick={handleClear}
              />
          )}
          <button
              onClick={handleSearch}
              className="px-3 py-1 bg-blue-500 text-white rounded"
          >
              <FontAwesomeIcon icon={faSearch} />
          </button>
      </div>
  )
};

export default Search;
