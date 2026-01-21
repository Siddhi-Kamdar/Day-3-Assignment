
import React, { useEffect, useState } from "react";

interface CategoryDropdownProps {
  category: string;
  onCategoryChange: (value: string) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  category,
  onCategoryChange
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          "https://dummyjson.com/products/category-list"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data: string[] = await response.json();
        setCategories(data);
      } catch (err) {
        setError("Could not load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        disabled={loading || !!error}
      >
        <option value="All">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
