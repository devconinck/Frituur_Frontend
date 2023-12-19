import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "~/contexts/auth.contexts";
import Error from "~/components/Error";
import * as api from "~/api/index";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "~/components/ui/alert-dialog";

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const { ready, isAuthed, token } = useAuth();

  const loginPath = `/login?redirect=${router.asPath}`;
  const registerPath = `/register?redirect=${router.asPath}`;

  api.setAuthToken(token);

  const handleLogin = () => {
    router.replace(loginPath);
  };

  const handleRegister = () => {
    router.replace(registerPath);
  };

  if (!ready || !token) {
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
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <div className="container flex max-w-2xl flex-col gap-y-4">
            <AlertDialogHeader>
              You must sign in to access this page
            </AlertDialogHeader>
            <AlertDialogDescription></AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogAction className="" onClick={handleRegister}>
                I don`t have an account
              </AlertDialogAction>
              <AlertDialogAction onClick={handleLogin}>
                Go to sign in
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
