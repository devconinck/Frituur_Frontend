import { NextPage } from "next";
import { AccountForm } from "~/components/AccountForm";

const MyAccount: NextPage = () => {
  return (
    <>
      <div>
        <div className="flex items-center justify-center text-4xl ">
          Profile information
          <p>Name, email address, phone number, language preference</p>
        </div>
        <div>
          <AccountForm />
        </div>
      </div>
    </>
  );
};

export default MyAccount;
