import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContextValue, useAuth } from "~/contexts/auth.contexts";

import React, { ReactNode } from "react";
import { Button } from "./ui/button";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { ready, isAdmin } = useAuth() as AuthContextValue;

  if (!ready) {
    return (
      <div>
        <div>
          <div>
            <h1>Loading</h1>
            <p>
              Please wait while we are checking your credentials and loading the
              application
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl text-red-500">
          You do not have access to this application!
        </div>
        <div className="text-xl text-red-500">
          Please
          <Button className="mx-5 my-4" variant={"ghost"}>
            <Link className="text-slate-500" href={"/"}>
              Click Here
            </Link>
          </Button>
          to return to the homepage
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;
