import { getOrdersByUserId } from "~/api/orders";
import useSWR from "swr";
import { Order } from "~/types";

import { use, useState } from "react";
import { Button } from "~/components/ui/button";
import { format } from "date-fns";
import { User, useAuth } from "~/contexts/auth.contexts";

export default function OrdersForm() {
  let userId: string | null = null;
  const { user } = useAuth() as { user: User };
  if (typeof localStorage !== "undefined") {
    userId = localStorage.getItem("userId");
  }
  const { data: orders = [] } = useSWR<Order[]>("orders", () =>
    getOrdersByUserId(user.id),
  );
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  return (
    <>
      <div className="mb-4">Check all your orders here</div>
      <div>
        {orders?.map((order) => {
          const orderTotal = order.items
            ?.reduce(
              (total, item) => total + item.product.price * item.quantity,
              0,
            )
            .toFixed(2);

          return (
            <div key={order.id} className="m-3 rounded border p-3 shadow-md">
              <p className="mb-2">Total Price: {orderTotal}</p>
              <p className="mb-2">
                Order Date:{" "}
                {format(new Date(order.pickup), "MMMM dd, yyyy HH:mm:ss")}
              </p>
              <Button
                onClick={() =>
                  setExpandedOrderId((prevId) =>
                    prevId === order.id ? null : order.id,
                  )
                }
                className="rounded px-3 py-1 "
              >
                See Details
              </Button>
              {expandedOrderId === order.id && (
                <div className="mt-3">
                  {order.items?.map((item) => (
                    <div key={item.product.id} className="mt-2 border p-2">
                      <p className="mb-1">Item: {item.product.name}</p>
                      <p>Price: {item.product.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
