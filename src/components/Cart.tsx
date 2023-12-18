import React from "react";
import { CartItem } from "~/types";
import { Button } from "./ui/button";
import { createOrderItem } from "~/api/order-items";
import { createOrder } from "~/api/orders";
import { useAuth } from "~/contexts/auth.contexts";

interface CartProps {
  cart: CartItem[];
  removeFromCart: (productId: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart }) => {
  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    const customerId = Number(localStorage.getItem("userId"));

    if (!customerId) {
      console.error("User ID not found in local storage");
      return;
    }

    console.log("Creating order for user", customerId);
    try {
      const response = await createOrder({ customerId });

      if (response) {
        cart.forEach(async (item) => {
          await createOrderItem({
            orderId: response.id,
            productId: item.product.id,
            quantity: item.quantity,
          });
        });
      }
    } catch (error) {
      console.error("Failed to create order", error);
    }
  };

  return (
    <div className="rounded-lg p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="max-h-64 overflow-auto">
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
          <Button onClick={handleCheckout} className="mt-4 rounded px-4 py-2 ">
            Checkout
          </Button>
        </>
      )}
    </div>
  );
};

export default Cart;
