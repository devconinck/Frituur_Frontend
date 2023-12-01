import React from "react";
import { CartItem } from "~/types";
import { Button } from "./ui/button";

interface CartProps {
  cart: CartItem[];
  removeFromCart: (productId: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart }) => {
  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="rounded-lg p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Your Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index} className="flex justify-between border-b py-2">
            <div>
              <p className="font-semibold">{item.product.name}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <p className="text-right">
              ${Number(item.product.price).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-right text-lg font-bold">
        Total: ${totalPrice.toFixed(2)}
      </p>
      <Button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        Checkout
      </Button>
    </div>
  );
};

export default Cart;
