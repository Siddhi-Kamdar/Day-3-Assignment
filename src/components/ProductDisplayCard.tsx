import type { Product } from "../App";

interface Props {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductDisplayCard = ({ product, onEdit, onDelete }: Props) => {
  return (
    <div className="border rounded-xl p-4 shadow-sm flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">{product.name}</h2>

        {product.price > 500 && (
          <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">
            Premium
          </span>
        )}
      </div>

      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="font-medium">${product.price}</p>

      {product.stock === 0 && (
        <span className="text-red-600 text-sm font-semibold">
          Out of Stock
        </span>
      )}

      {product.stock > 0 && product.stock < 5 && (
        <span className="text-orange-500 text-sm font-semibold">
          Limited Quantity
        </span>
      )}

      <p className="text-sm">Stock: {product.stock}</p>

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onEdit(product)}
          className="flex-1 bg-blue-500 text-black py-1 rounded text-sm"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(product.id)}
          className="flex-1 bg-red-500 text-black py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductDisplayCard;