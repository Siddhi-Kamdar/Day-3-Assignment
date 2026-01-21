import { useEffect, useState } from "react";
import type { Product } from "../App";

interface Props {
  onSave: (product: Product) => void;
  selectedProduct: Product | null;
}

const emptyForm = {
  name: "",
  price: 0,
  category: "",
  stock: 0,
};

const EForm = ({ onSave, selectedProduct }: Props) => {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (selectedProduct) {
      setFormData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "name" || name === "category"
          ? value
          : Number(value),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      formData.price <= 0 ||
      formData.stock < 0
    ) {
      return;
    }

    onSave({
      ...formData,
      id: selectedProduct?.id || crypto.randomUUID(),
    });

    setFormData(emptyForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow flex flex-col gap-4"
    >
      <h2 className="font-semibold text-lg">
        {selectedProduct ? "Edit Product" : "Add Product"}
      </h2>

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">
          Product Name
        </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="price" className="text-sm font-medium">
          Price ($)
        </label>
        <input
          id="price"
          name="price"
          type="number"
          min={1}
          value={formData.price}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="category" className="text-sm font-medium">
          Category
        </label>
        <input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="stock" className="text-sm font-medium">
          Stock Quantity
        </label>
        <input
          id="stock"
          name="stock"
          type="number"
          min={0}
          value={formData.stock}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <button className="bg-black text-black py-2 rounded">
        Save Product
      </button>
    </form>
  );
};

export default EForm;