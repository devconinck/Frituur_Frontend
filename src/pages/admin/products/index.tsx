import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import AddOrEdit from "./AddOrEdit";
import { Product } from "../../../types";
import AdminLayout from "../layout";
import { Separator } from "~/components/ui/separator";
import ProductListAdmin from "./ProductsListAdmin";
import useSWR from "swr";
import { getAllProducts } from "~/api/products";
import useSWRMutation from "swr/mutation";
import { deleteProduct } from "~/api/products";
import { set } from "date-fns";
import Loader from "~/components/Loader";
import AsyncData from "~/components/AsyncData";

const AdminPage: React.FC = () => {
  const {
    data: products,
    mutate,
    isLoading,
    error,
  } = useSWR("products", getAllProducts);
  const [currentProduct, setCurrentProduct] = useState({});

  const setProductToUpdate = useCallback(
    (id: number) => {
      setCurrentProduct(id === null ? {} : products?.find((t) => t.id === id));
    },
    [products],
  );

  const deleteProducts = useCallback(
    async (id: number) => {
      await deleteProduct(id);
      window.location.reload(); //moet dit doen want anders een error dat map geen function is => refresh zodat data opnieuw wordt opgehaald en de correcte items toont
      mutate("products");
    },
    [deleteProduct, mutate],
  );

  return (
    <AdminLayout>
      <div className="p-4">
        <AddOrEdit
          setProductToUpdate={setProductToUpdate}
          currentProduct={currentProduct}
        />
        <Separator className="mb-5" />
        <AsyncData isLoading={isLoading} error={error}>
          <ProductListAdmin
            products={products || []}
            onEdit={setProductToUpdate}
            onDelete={deleteProducts}
          />
        </AsyncData>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
