import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="grid grid-cols-3 ">
      {products.map((product) => (
        <div className="m-4 border rounded-xl p-4 shadow-sm flex flex-col gap-2">
          <div className="flex justify-between items-center"></div>
          <div key={product.id} style={{ marginBottom: "10px" }}>
            <h2 className="font-bold">{product.title}</h2>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
          </div>
          <button
            className="flex-1 bg-blue-500 text-black py-1 rounded text-sm"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
