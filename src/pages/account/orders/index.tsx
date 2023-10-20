import { Separator } from "~/components/ui/separator";
import OrdersForm from "./ordersForm";
import SettingsLayout from "../layout";

export default function Orders() {
  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">My Orders</h3>
          <p className="text-sm text-muted-foreground">
            Check your order history here
          </p>
        </div>
        <Separator />
        <OrdersForm />
      </div>
    </SettingsLayout>
  );
}
