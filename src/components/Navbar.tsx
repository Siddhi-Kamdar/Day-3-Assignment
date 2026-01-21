import CategoryDropdown from "./CategoryDropdown";
import React, { useState } from "react";

interface ThemeProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

interface SearchProps {
  onSearch: (query: string) => void;
}

type NavbarProps = ThemeProps & SearchProps;

const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  onSearch
}) => {

  const [input, setInput] = useState(""); 
  const handleSearch = () => {
    onSearch(input.trim());
  };

  return (
    <nav
      className="flex items-center justify-between p-4 gap-4"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)"
      }}
    >
      <h2 className="text-xl font-bold">E-Com</h2>

      <div className="flex w-full sm:w-auto gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search products..."
          className="w-full sm:w-64 px-3 py-2 rounded bg-white text-black outline-none"
        />

        <button
          onClick={handleSearch}
          className="px-4 py-2 rounded bg-blue-500 text-black font-medium"
        >
          Search
        </button>
      </div>

      <CategoryDropdown />

      <button
        onClick={toggleTheme}
        className="ml-4 rounded border"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <button> 🛒 </button>
    </nav>
  );
};

export default Navbar;
