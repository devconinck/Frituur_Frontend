import { Product } from "~/types";
import AdminProduct from "src/components/AdminProduct";

interface ProductListAdminProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

const ProductListAdmin: React.FC<ProductListAdminProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <AdminProduct
          key={product.id}
          product={product}
          onEdit={(id) => onEdit(product)}
          onDelete={() => onDelete(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductListAdmin;
