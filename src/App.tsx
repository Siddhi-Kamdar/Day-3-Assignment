import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProductDisplayCard from "./components/ProductDisplayCard";
import "./styles.css";
import ProductList from "./components/ProductList";


type Theme = "light" | "dark";

const App = () => {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme) || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };



  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="p-4 sm:p-6 ">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <ProductList />
          <section className="lg:col-span-3 flex flex-col gap-6">
          



          </section>
        </div>
      </main>
    </>
  );
};

const Stat = ({ label, value }: { label: string; value: any }) => (
  <div className="bg-white p-4 rounded-xl shadow text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default App;