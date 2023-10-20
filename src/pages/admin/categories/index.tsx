import { Separator } from "~/components/ui/separator";
import CategoriesForm from "./categoriesForm";
import AdminLayout from "../layout";

export default function Orders() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Admin Categories</h3>
        </div>
        <Separator />
        <CategoriesForm />
      </div>
    </AdminLayout>
  );
}
