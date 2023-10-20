import { Separator } from "~/components/ui/separator";
import CustomerCardForm from "./customer-card-form";
import SettingsLayout from "../layout";

export default function CustomerCard() {
  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">My Customer Card</h3>
          <p className="text-sm text-muted-foreground">
            Check the points you have acquired on your Customer Card and how you
            can spend them
          </p>
        </div>
        <Separator />
        <CustomerCardForm />
      </div>
    </SettingsLayout>
  );
}
