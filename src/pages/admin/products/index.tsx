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

const AdminPage: React.FC = () => {
  const { data: products, mutate } = useSWR("products", getAllProducts);
  const { trigger: productDelete } = useSWRMutation("products", deleteProduct);
  const [currentProduct, setCurrentProduct] = useState({});

  const setProductToUpdate = useCallback(
    (id: number) => {
      setCurrentProduct(id === null ? {} : products?.find((t) => t.id === id));
    },
    [products],
  );

  return (
    <AdminLayout>
      <div className="p-4">
        <AddOrEdit
          setProductToUpdate={setProductToUpdate}
          currentProduct={currentProduct}
        />
        <Separator className="mb-5" />
        <ProductListAdmin
          products={products || []}
          onEdit={setProductToUpdate}
          onDelete={deleteProduct}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
