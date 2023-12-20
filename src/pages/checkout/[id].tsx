import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { getOrderById } from "~/api/orders";
import Error from "~/components/Error";
import Loader from "~/components/Loader";
import { Button } from "~/components/ui/button";

export const Checkout: NextPage = () => {
  const router = useRouter();

  const orderId = router.query.id!!;

  const { data, isLoading, error } = useQuery({
    queryKey: ["order", orderId],
    // @ts-ignore
    queryFn: () => getOrderById(orderId!!),
  });

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    //@ts-ignore
    return <Error error={error} />;
  }

  const order = data!!;
  console.log(order);

  /* const totalPrice = order.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  ); */

  return (
    <div className="flex min-h-screen  flex-col items-center  p-10">
      <h1 className="mb-4 text-3xl font-bold">Thank you for your order!</h1>
      <h2 className="mb-2 text-2xl font-semibold">Order Overview:</h2>
      <div className="mb-6 rounded p-4 shadow">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index} className="border-b">
                {/*@ts-ignore*/}
                <td className="px-4 py-2">{item.product.name}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">
                  $
                  {
                    //@ts-ignore
                    Number(item.product.price).toFixed(2)
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mb-4">
        An email confirmation has been sent to your email address.
      </p>
      <p className="mb-6">
        If something went wrong, please call us at:
        <span className="font-bold">123-456-7890</span>
      </p>
      <Button onClick={() => router.push("/")} className="w-full max-w-2xl">
        Go back to the homepage
      </Button>
    </div>
  );
};

export default Checkout;
