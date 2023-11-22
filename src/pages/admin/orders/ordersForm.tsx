import useSWR from "swr";
import { getAllCustomers } from "~/api/customers";
import { getAllOrderItems } from "~/api/order-items";
import { getAllOrders } from "~/api/orders";
import { Customer, Order } from "~/types";

import { useState } from "react";
import { getAllProducts } from "~/api/products";
import { Button } from "~/components/ui/button";
import { format } from "date-fns";

export default function OrdersForm() {
  const { data: orders = [] } = useSWR("orders", getAllOrders);
  const { data: orderItems = [] } = useSWR("orderItems", getAllOrderItems);
  const { data: customers = [] } = useSWR("customers", getAllCustomers);
  const { data: products = [] } = useSWR("products", getAllProducts);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  return (
    <>
      <div className="mb-4">Check all your orders here</div>
      <div>
        {orders?.map((order: Order) => {
          const customer = customers?.find(
            (customer) => customer.id === order.customerId,
          );
          const orderTotal = orderItems
            ?.filter((item) => item.orderId === order.id)
            .reduce((total, item) => total + item.price, 0);

          return (
            <div key={order.id} className="m-3 rounded border p-3 shadow-md">
              <h3 className="mb-2 text-xl font-semibold">
                {customer?.firstName} {customer?.lastName}
              </h3>
              <p className="mb-2">Total Price: {orderTotal}</p>
              <p className="mb-2">
                Order Date:{" "}
                {format(new Date(order.pickup), "MMMM dd, yyyy HH:mm:ss")}
              </p>
              <Button
                onClick={() => {
                  if (expandedOrderId == order.id) setExpandedOrderId(null);
                  else setExpandedOrderId(order.id);
                }}
                className="rounded bg-blue-500 px-3 py-1 text-white"
              >
                See Details
              </Button>
              {expandedOrderId === order.id && (
                <div className="mt-3">
                  {orderItems
                    ?.filter((item) => item.orderId === order.id)
                    .map((item) => {
                      const product = products?.find(
                        (product) => product.id === item.productId,
                      );
                      return (
                        <div key={item.orderId} className="mt-2 border p-2">
                          <p className="mb-1">Item: {product?.name}</p>
                          <p>Price: {product?.price}</p>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
