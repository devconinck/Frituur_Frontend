import { Separator } from "~/components/ui/separator";
import OrdersFormAdmin from "../../../components/ordersFormAdmin";

export default function Orders() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Admin Orders</h3>
      </div>
      <Separator />
      <OrdersFormAdmin />
    </div>
  );
}
