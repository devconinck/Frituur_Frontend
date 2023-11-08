import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AddOrEdit from "./AddOrEdit";
import { Product } from "../../../types";
import AdminLayout from "../layout";
import { useGetAllProducts } from "~/hooks/products";
import { Separator } from "~/components/ui/separator";
import ProductListAdmin from "./ProductsListAdmin";

const AdminPage: React.FC = () => {
  const { data: products = [] } = useGetAllProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const methods = useForm<Product>();
  const { handleSubmit, reset } = methods;

  const handleFormSubmit = (data: Product) => {
    // Handle form submission (save or add product)
    // You'll need to implement the logic to interact with your database here
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    reset(product); // Reset the form with the selected product data
  };

  const handleDeleteProduct = (productId: number) => {
    // Implement the delete functionality
  };

  return (
    <AdminLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Page</h1>
        <Separator />

        <AddOrEdit
          product={methods.watch()}
          methods={methods}
          onSubmit={handleSubmit(handleFormSubmit)}
        />
        <Separator />
        <ProductListAdmin
          products={products}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
