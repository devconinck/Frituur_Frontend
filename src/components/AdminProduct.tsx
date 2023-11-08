import { Edit3, Trash2 } from "lucide-react";
import { Product } from "~/types";

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
            <Edit3 onClick={onEdit} className="cursor-pointer">
              Edit Product
            </Edit3>
            <Trash2 onClick={onDelete} className="cursor-pointer">
              {" "}
              Delete Product
            </Trash2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
