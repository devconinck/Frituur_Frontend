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

function LabelInput({ label, name, type, validationRules, ...rest }) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const hasError = name in errors;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...register(name, validationRules)}
        id={name}
        type={type}
        disabled={isSubmitting}
        className="mt-1 w-full rounded-md border border-slate-600 p-2"
        {...rest}
      />
      {hasError ? <div className="">{errors[name]}</div> : null}
    </div>
  );
}

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
  }, [redirect]);

  const handleLogin = useCallback(
    async ({ email, password }) => {
      const loggedIn = await login(email, password);

      const { redirect } = router.query;

      console.log("redirect", redirect);

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
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <FormProvider {...methods}>
            <div className="container max-w-2xl">
              <form
                className="flex flex-col"
                onSubmit={handleSubmit(handleLogin)}
              >
                <AlertDialogHeader>Sign in</AlertDialogHeader>
                <AlertDialogDescription>
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
                </AlertDialogDescription>
                <AlertDialogFooter>
                  <div className=" flex justify-end">
                    <div className="">
                      <AlertDialogAction
                        className="mx-4"
                        onClick={handleRegister}
                      >
                        I don't have an account
                      </AlertDialogAction>
                      <AlertDialogAction type="submit" disabled={loading}>
                        Sign in
                      </AlertDialogAction>
                    </div>
                  </div>
                </AlertDialogFooter>
              </form>
            </div>
          </FormProvider>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Login;
