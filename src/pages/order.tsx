import { NextPage } from "next";
import ProductsListUser from "~/components/ProductsListUser";
const Order: NextPage = () => {
  return (
    <>
      <div className="flex items-center justify-center pt-8 text-4xl font-bold">
        Here comes all the order information and utility
      </div>
      <ProductsListUser />
    </>
  );
};

export default Order;
