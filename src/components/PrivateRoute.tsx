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
    return (
      <div>
        <div>
          <div>
            <h1>Not logged in</h1>
            <p>
              You are not logged in. Please <a href={loginPath}>login</a> to
              continue
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
