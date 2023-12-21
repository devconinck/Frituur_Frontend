//@ts-nocheck
import { getAllOrders } from "~/api/orders";
import { Order } from "~/types";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import Error from "./Error";

export default function OrdersListAdmin() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;

  const orders = data!!;

  return (
    <>
      <h2 className="mb-2 mt-3 text-2xl font-semibold">
        Check your orders here
      </h2>
      <div>
        {orders?.map((order: Order) => {
          const orderTotal = order.items
            ?.reduce(
              (total, item) => total + item.product.price * item.quantity,
              0,
            )
            .toFixed(2);

          return (
            <div key={order.id} className="m-3 rounded border p-3 shadow-md">
              <h3 className="mb-2 text-xl font-semibold">
                {order.customer?.firstName} {order.customer?.lastName}
              </h3>
              <p className="mb-2">Total Price: {orderTotal}</p>
              <p className="mb-2">
                Order Date:{" "}
                {format(new Date(order.createdAt), "MMMM dd, yyyy HH:mm:ss")}
              </p>
              <Button
                onClick={() =>
                  setExpandedOrderId((prevId) =>
                    prevId === order.id ? null : order.id,
                  )
                }
                className="rounded  px-3 py-1 "
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
