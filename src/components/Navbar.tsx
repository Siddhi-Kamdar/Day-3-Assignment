
import React from "react";

interface SearchProps {
  search: string;
  onSearchChange: (value: string) => void;
}

interface ThemeProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

type NavbarProps =  ThemeProps;

const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme
}) => {
  return (
    <nav
      className="flex items-center justify-between p-4"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)"
      }}
    >
      <h2 className="text-xl font-bold">E-Com</h2>

      <input
        type="text"
        // value={search}
        // onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search..."
        className="w-full sm:w-72 px-3 py-2 rounded bg-white text-black outline-none"
      />

      <button
        onClick={toggleTheme}
        className="ml-4 px-3 py-2 rounded border"
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </nav>
  );
};

export default Navbar;
