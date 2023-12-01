import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "~/contexts/auth.contexts";

const AdminRoute = ({ children }) => {
  const router = useRouter();
  const { ready, isAdmin } = useAuth();

  const loginPath = `/login?redirect=${router.asPath}`;

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
      <div>
        <div className="text-2xl text-red-500">
          You do not have access to this application!
        </div>
        <div className="text-xl text-red-500">
          Please return to the homepage{" "}
          <Link className="text-slate-500" href={"localhost:3000/"}>
            here
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;
