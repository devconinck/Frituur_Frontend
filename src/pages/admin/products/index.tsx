import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import AddOrEdit from "../../../components/AddOrEdit";
import { Product } from "../../../types";
import AdminLayout from "../layout";
import { Separator } from "~/components/ui/separator";
import ProductListAdmin from "../../../components/ProductsListAdmin";
import useSWR from "swr";
import { getAllProducts } from "~/api/products";
import useSWRMutation from "swr/mutation";
import { deleteProduct } from "~/api/products";
import { set } from "date-fns";
import Loader from "~/components/Loader";
import AsyncData from "~/components/AsyncData";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { id } from "date-fns/locale";

const queryClient = new QueryClient();

const AdminPage: React.FC = () => {
  const productsQuery = useQuery({
    queryKey: ["adminProducts"],
    queryFn: getAllProducts,
  });

  const [currentProduct, setCurrentProduct] = useState({});

  if (productsQuery.isLoading) return <Loader />;
  if (productsQuery.error) return <p>Error</p>;

  const products = productsQuery.data;

  const setProductToUpdate = (id: number) => {
    setCurrentProduct(id === null ? {} : products?.find((t) => t.id === id));
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
