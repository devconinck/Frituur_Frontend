import React, { useState } from "react";
import AddOrEdit from "../../../components/AddOrEdit";
import { Separator } from "~/components/ui/separator";
import ProductListAdmin from "../../../components/ProductsListAdmin";
import { getAllProducts } from "~/api/products";
import Loader from "~/components/Loader";
import { useQuery } from "@tanstack/react-query";
import Error from "~/components/Error";
import { Product } from "~/types";

const AdminPage: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminProducts"],
    queryFn: getAllProducts,
  });

  const [currentProduct, setCurrentProduct] = useState({});

  if (isLoading) return <Loader />;
  //@ts-ignore
  if (error) return <Error error={error} />;

  const products = data;

  const setProductToUpdate = (id: number): void => {
    setCurrentProduct(
      id === null
        ? {}
        : products?.find((product: Product) => product.id === id) ?? {},
    );
  };

  return (
    <div className="p-4">
      <AddOrEdit
        setProductToUpdate={setProductToUpdate}
        currentProduct={currentProduct}
      />
      <Separator className="mb-5" />

      <ProductListAdmin products={products} onEdit={setProductToUpdate} />
    </div>
  );
};

export default AdminPage;
