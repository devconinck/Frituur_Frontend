import { Edit3, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { Product } from "~/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import Image from "next/image";

interface AdminProductProps {
  product: Product;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const AdminProduct: React.FC<AdminProductProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const handleDelete = useCallback(() => {
    onDelete(product.id);
  }, [product.id, onDelete]);

  const handleEdit = useCallback(() => {
    onEdit(product.id);
  }, [product.id, onEdit]);

  return (
    <div key={product.id} className="">
      <div className=" items-center justify-center rounded-lg border p-4">
        <div className="mb-2 flex justify-between">
          <Image
            src={`/productImages/${product.url}`}
            alt={product.name}
            height={80}
            width={80}
            className="h-20 w-20 rounded-lg object-cover"
          />
        </div>
        <div className="mb-2 flex items-center px-8 text-xl font-semibold">
          {product.name}
        </div>
        <div className="flex items-center justify-between pr-3">
          <div>
            <Edit3 onClick={handleEdit} className="cursor-pointer">
              Edit Product
            </Edit3>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Trash2 className="cursor-pointer">Delete Product</Trash2>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this product and remove the data from your server.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
