import { useState } from "react";
import { Product } from "src/types";
import AdminProduct from "~/components/AdminProduct";

export default function ProductsListAdmin({
  products,
  onDelete,
  onEdit,
}: {
  products: Product[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}) {
  return (
    <div className="flex flex-row">
      <div className="h-full w-full">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products?.map((product: Product) => (
            <AdminProduct
              {...product}
              product={product}
              key={product.id}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
