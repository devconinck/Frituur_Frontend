import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "~/contexts/auth.contexts";

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const { ready, isAuthed } = useAuth();

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

  if (!isAuthed) {
    router.replace(loginPath);
  }

  return <>{children}</>;
};

export default PrivateRoute;


