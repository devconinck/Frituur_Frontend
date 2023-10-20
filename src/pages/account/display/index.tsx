import { Separator } from "~/components/ui/separator";
import DisplayForm from "./display-form";
import SettingsLayout from "../layout";

export default function Display() {
  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Display</h3>
          <p className="text-sm text-muted-foreground">
            Change preferences for how your account appears
          </p>
        </div>
        <Separator />
        <DisplayForm />
      </div>
    </SettingsLayout>
  );
}
