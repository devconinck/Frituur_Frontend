import React from "react";
import { Product } from "~/types";

interface CartProps {
  cart: Product[];
  removeFromCart: (productId: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart }) => {
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="mt-4 rounded border p-4">
      <h2 className="mb-2 text-xl font-semibold">Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="mb-2 border-b pb-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold">{item.name}</span>
                <div className="mt-1 flex items-center space-x-2">
                  <button
                    className="rounded bg-blue-500 p-1 text-white hover:bg-blue-600"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <span className="font-semibold">Quantity:</span>
                <span className="ml-2">1</span>{" "}
              </div>
              <div className="font-semibold">${item.price}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 border-t pt-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Total Price:</span>
          <span className="font-semibold">${calculateTotalPrice()}</span>
        </div>
        <button className="mt-2 rounded bg-blue-500 p-2 text-white hover:bg-blue-600">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
