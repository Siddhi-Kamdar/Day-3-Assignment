import CategoryDropdown from "./CategoryDropdown";
import React, { useState } from "react";
import CartPopup from "./CartPopup";
import { useCart } from "./CartContext";

interface ThemeProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

interface NavbarProps extends ThemeProps {
  onSearch: (query: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  onSearch,
  category,
  onCategoryChange
}) => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const handleSearch = () => {
    onSearch(input.trim());
  };
  const { totalItems } = useCart();

  return (
    <nav
      className="flex items-center justify-between p-4 gap-4"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)"
      }}
    >
      <h2 className="text-xl font-bold">E-Com</h2>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search products..."
          className="w-64 px-3 py-2 rounded bg-white text-black outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 rounded bg-blue-500 text-black"
        >
          Search
        </button>
      </div>

      <CategoryDropdown
        category={category}
        onCategoryChange={onCategoryChange}
      />

      <button onClick={toggleTheme} className="rounded border px-2">
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <button onClick={() => setOpen(true)} className="relative">
        🛒
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
            {totalItems}
          </span>
        )}
      </button>
      {open && <CartPopup onClose={() => setOpen(false)} />}
    </nav>
  );
};

export default Navbar;