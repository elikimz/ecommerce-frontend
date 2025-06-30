import { useState, useEffect } from "react";

interface SearchBarProps {
  initialSearch?: string;
  onSearch: (searchTerm: string) => void;
}

const SearchBar = ({ initialSearch = "", onSearch }: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState(initialSearch);

  // Reset searchInput when initialSearch changes
  useEffect(() => {
    setSearchInput(initialSearch);
  }, [initialSearch]);

  const handleSearch = () => {
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      setSearchInput(""); // Clear input after search
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-center items-center py-2 px-2 md:px-4">
      <input
        type="text"
        placeholder="Search for products, brands..."
        className="w-full md:w-1/2 border border-gray-300 rounded-full px-4 py-2 focus:outline-none text-xs md:text-sm"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSearch}
        className="bg-orange-500 rounded-full p-2 ml-2"
        aria-label="Search"
      >
        <svg
          className="text-white w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103 10.5a7.5 7.5 0 0013.15 6.15z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
