import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProductDisplayCard from "./components/ProductDisplayCard";
import EForm from "./components/EForm";
import "./styles.css";

type Theme = "light" | "dark";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
}

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

  const [products, setProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem("products");
    return stored ? JSON.parse(stored) : [];
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleSave = (product: Product) => {
    setProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      return exists
        ? prev.map((p) => (p.id === product.id ? product : p))
        : [...prev, product];
    });
    setSelectedProduct(null);
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalInventoryValue = products.reduce(
    (sum, p) => sum + p.price * p.stock,
    0
  );

  const lowStockCount = products.filter((p) => p.stock < 5).length;

  return (
    <>
      <Navbar  theme={theme} toggleTheme={toggleTheme} search={search} onSearchChange={setSearch} />

      <main className="p-4 sm:p-6 "> 
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          <aside className="lg:col-span-1">
            <EForm
              onSave={handleSave}
              selectedProduct={selectedProduct}
            />
          </aside>

          <section className="lg:col-span-3 flex flex-col gap-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <Stat label="Total Products" value={products.length} />
              <Stat label="Low Stock Alert" value={lowStockCount} />
              <Stat
                label="Inventory Value"
                value={`$${totalInventoryValue}`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductDisplayCard
                  key={product.id}
                  product={product}
                  onEdit={setSelectedProduct}
                  onDelete={handleDelete}
                />
              ))}
            </div>
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