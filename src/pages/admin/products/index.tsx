import { Separator } from "~/components/ui/separator";
import ProductsForm from "./productsForm";
import AdminLayout from "../layout";

export default function Products() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Admin Products</h3>
        </div>
        <Separator />
        <ProductsForm />
      </div>
    </AdminLayout>
  );
}
