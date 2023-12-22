import { useRouter } from "next/router";
import React from "react";
import { AuthContextValue, useAuth } from "~/contexts/auth.contexts";
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

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { ready, isAuthed, token } = useAuth() as AuthContextValue;

  const loginPath = `/login?redirect=${router.asPath}`;
  const registerPath = `/register?redirect=${router.asPath}`;

  api.setAuthToken(token!!);

  const handleLogin = () => {
    router.push(loginPath);
  };

  const handleRegister = () => {
    router.push(registerPath);
  };

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
