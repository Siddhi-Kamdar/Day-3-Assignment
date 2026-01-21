import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import "./styles.css";
import ProductList from "./components/ProductList";

type Theme = "light" | "dark";

const App = () => {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme) || "light"
  );

  const [search, setSearch] = useState(""); 

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onSearch={setSearch}   
      />

      <main className="p-4 sm:p-6">
        <div className="grid gap-6">
          <ProductList search={search} />
        </div>
      </main>
    </>
  );
};

export default App;