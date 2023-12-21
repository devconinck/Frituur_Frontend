import { Product } from "~/types";
import AdminProduct from "src/components/AdminProduct";

interface ProductListAdminProps {
  products: Product[] | undefined | null;
  onEdit: (id: number) => void;
}

const ProductListAdmin: React.FC<ProductListAdminProps> = ({
  products,
  onEdit,
}) => {
  return (
    <div
      data-cy="products"
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      {products?.map((product) => (
        <AdminProduct key={product.id} product={product} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default ProductListAdmin;
