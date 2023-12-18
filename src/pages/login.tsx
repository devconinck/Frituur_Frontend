import { NextPage } from "next";
import { redirect } from "next/navigation";
import { useCallback } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useAuth } from "~/contexts/auth.contexts";
import Error from "~/components/Error";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import LabelInput from "~/components/LabelInput";

const validationRules = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^\S+@\S+$/i,
      message: "Email is invalid",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
  },
};

export const Login: NextPage = () => {
  const { error, loading, login } = useAuth();
  const methods = useForm({
    defaultValues: {
      email: "Quinten@gmail.com",
      password: "StrongPassword1",
    },
  });
  const router = useRouter();
  const { handleSubmit } = methods;

  const handleRegister = useCallback(() => {
    router.replace("/register");
  }, [router]);

  const handleLogin = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const loggedIn = await login(email, password);

      const { redirect } = router.query;

      if (loggedIn) {
        router.push(
          `http://localhost:3000${redirect ? String(redirect) : "/"}`,
        );
      }
    },
    [router.push, login],
  );
  return (
    <div>
      <FormProvider {...methods}>
        <div className="container max-w-2xl">
          <form className="flex flex-col" onSubmit={handleSubmit(handleLogin)}>
            <h1 className="text-2xl font-bold">Sign in</h1>
            <Error error={error} />

            <LabelInput
              label="email"
              type="text"
              name="email"
              placeholder="your@email.com"
              validationRules={validationRules.email}
            />

            <LabelInput
              label="password"
              type="password"
              name="password"
              validationRules={validationRules.password}
            />
            <div className=" flex justify-end">
              <Button
                disabled={loading}
                className="mx-4"
                onClick={handleRegister}
              >
                I don't have an account
              </Button>
              <Button type="submit" disabled={loading}>
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </FormProvider>
    </div>
  );
};

export default Login;
