import { AccountForm } from "~/components/AccountForm";
import { Separator } from "~/components/ui/separator";
import SettingsLayout from "./layout";

export default function MyAccount() {
  return (
    <>
      <SettingsLayout>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Account</h3>
            <p className="text-sm text-muted-foreground">
              Change account settings
            </p>
          </div>

          <Separator />
          <AccountForm />
        </div>
      </SettingsLayout>
    </>
  );
}
