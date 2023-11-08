import React, { useState, useEffect } from "react";
import ProductsListAdmin from "./ProductsListAdmin";
import AddOrEdit from "./AddOrEdit";
import { useGetAllProducts } from "~/hooks/products";
import { Product } from "~/types";
import { updateProduct } from "~/pages/api/products";

export default function AdminProducts() {
  const { data: products = [], isLoading, error } = useGetAllProducts();
  const [currentProduct, setCurrentProduct] = useState({});

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
  };

  const handleDelete = (id: number) => {
    // Implement deleting a product
  };

  const handleAddProduct = () => {
    setCurrentProduct({});
  };

  const handleSaveProduct = (product: Product) => {
    updateProduct(product.id, product);
  };

  return (
    <div>
      <h1>Admin Products</h1>
      <AddOrEdit product={currentProduct} onSave={handleSaveProduct} />
      <ProductsListAdmin
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
