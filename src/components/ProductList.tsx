
import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
}

interface ProductListProps {
  search: string;
}

const ProductList: React.FC<ProductListProps> = ({ search }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = search
          ? `https://dummyjson.com/products/search?q=${search}`
          : "https://dummyjson.com/products";

        const response = await fetch(url);
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
  }, [search]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="m-4 border rounded-xl p-4 shadow-sm flex flex-col gap-2"
        >
          <h2 className="font-bold">{product.title}</h2>
          <p>Category: {product.category}</p>
          <p>Price: ${product.price}</p>

          <button className="mt-auto bg-blue-500 text-black py-1 rounded text-sm">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;