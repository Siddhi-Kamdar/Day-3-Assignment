import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
}

interface ProductListProps {
  search: string;
  category: string;
}

const ProductList: React.FC<ProductListProps> = ({ search, category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = "https://dummyjson.com/products";

        if (search) {
          url = `https://dummyjson.com/products/search?q=${search}`;
        } else if (category !== "All") {
          url = `https://dummyjson.com/products/category/${category}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
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