import { useCart } from "./CartContext";

interface Props {
  onClose: () => void;
}

const CartPopup: React.FC<Props> = ({ onClose }) => {
  const {
    cart,
    increase,
    decrease,
    remove,
    clearCart,
    totalItems,
    totalPrice
  } = useCart();

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div className="w-80 bg-white h-full p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>

        {cart.length === 0 && <p>Cart is empty</p>}

        <div className="flex-1 overflow-auto">
          {cart.map((item) => (
            <div key={item.id} className="border-b py-3">
              <p className="font-semibold">{item.title}</p>
              <p>${item.price}</p>

              <div className="flex items-center gap-2 mt-2">
                <button onClick={() => decrease(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increase(item.id)}>+</button>
                <button onClick={() => remove(item.id)}>remove</button>
              </div>
            </div>
          ))}
        </div>

        {/* total baki che */}
        {cart.length > 0 && (
          <div className="mt-4 border-t pt-4">
            <p>Total Items: <b>{totalItems}</b></p>
            <p>Total Price: <b>${totalPrice.toFixed(2)}</b></p>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-2">
          {cart.length > 0 && (
            <>
              <button
                onClick={clearCart}
                className="border py-2 rounded"
              >
                Clear Cart
              </button>

              <button
                className="bg-green-500 py-2 rounded text-black font-semibold"
              >
                Checkout
              </button>
            </>
          )}

          <button
            onClick={onClose}
            className="border py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;