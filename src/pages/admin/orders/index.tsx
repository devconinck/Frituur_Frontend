import { Separator } from "~/components/ui/separator";
import OrdersForm from "../../../components/ordersForm";

export default function Orders() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Admin Orders</h3>
      </div>
      <Separator />
      <OrdersForm />
    </div>
  );
}
