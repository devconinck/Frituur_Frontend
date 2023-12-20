import { getOrdersByUserId } from "~/api/orders";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { format } from "date-fns";
import { User, useAuth } from "~/contexts/auth.contexts";
import { useQuery } from "@tanstack/react-query";
import Loader from "~/components/Loader";
import Error from "~/components/Error";

export default function OrdersForm() {
  let userId: string | null = null;
  const { user } = useAuth() as { user: User };
  if (typeof localStorage !== "undefined") {
    userId = localStorage.getItem("userId");
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrdersByUserId(user.id),
  });
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  if (isLoading) return <Loader />;
  //@ts-ignore
  if (error) return <Error error={error} />;
  const orders = data!!;
  return (
    <>
      <div className="mb-4">Check all your orders here</div>
      <div>
        {orders?.map((order) => {
          const orderTotal = order.items
            ?.reduce(
              //@ts-ignore
              (total, item) => total + item.product.price * item.quantity,
              0,
            )
            .toFixed(2);

          return (
            <div key={order.id} className="m-3 rounded border p-3 shadow-md">
              <p className="mb-2">Total Price: {orderTotal}</p>
              <p className="mb-2">
                Order Date:
                {
                  //@ts-ignore
                  format(new Date(order.pickup), "MMMM dd, yyyy HH:mm:ss")
                }
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
                    //@ts-ignore
                    <div key={item.product.id} className="mt-2 border p-2">
                      <p className="mb-1">
                        Item:{" "}
                        {
                          //@ts-ignore

                          item.product.name
                        }
                      </p>
                      <p>
                        Price:{" "}
                        {
                          //@ts-ignore
                          item.product.price
                        }
                      </p>
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
