import { Separator } from "~/components/ui/separator";
import OrdersListAdmin from "../../../components/ordersListAdmin";
import AdminRoute from "~/components/AdminRoute";

export default function Orders() {
  return (
    <AdminRoute>
      <div className="space-y-6">
        <OrdersListAdmin />
      </div>
    </AdminRoute>
  );
}
