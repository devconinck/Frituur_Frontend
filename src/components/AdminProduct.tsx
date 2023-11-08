import { Product } from "~/types";
import { Button } from "./ui/button";
import { memo, useCallback } from "react";
import { on } from "events";
import { Trash2, Edit3 } from "lucide-react";
import { DeleteButton } from "./DeleteButton";

type AdminProductProps = {
  product: Product;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

export default memo(function AdminProduct({
  product,
  onDelete,
  onEdit,
}: AdminProductProps) {
  const handleDelete = useCallback(() => {
    onDelete(product.id);
  }, [onDelete, product.id]);

  const handleEdit = useCallback(() => {
    onEdit(product.id);
  }, [onEdit, product.id]);

  return (
    <div key={product.id} className="">
      <div className=" items-center justify-center rounded-lg border p-4">
        <div className="mb-2 flex justify-between">
          <img
            src={`/productImages/${product.url}`}
            alt={product.name}
            className="h-20 w-20 rounded-lg object-cover"
          />
        </div>
        <div className="mb-2 flex items-center px-8 text-xl font-semibold">
          {product.name}
        </div>
        <div className="flex items-center justify-between pr-3">
          <div>
            <Edit3 onClick={handleEdit}>Edit Product</Edit3>
            <Trash2 onClick={handleDelete}> Delete Product</Trash2>
          </div>
        </div>
      </div>
    </div>
  );
});
