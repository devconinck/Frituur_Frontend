import { NextPage } from "next";
import { redirect } from "next/navigation";
import { useCallback } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useAuth } from "~/contexts/auth.contexts";
import Error from "~/components/Error";
import { Button } from "~/components/ui/button";

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
      email: "maxim@lison.be",
      password: "password7",
    },
  });
  const { handleSubmit, reset } = methods;

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleLogin = useCallback(
    async ({ email, password }) => {
      const loggedIn = await login(email, password);

      if (loggedIn) {
        redirect("/");
      }
    },
    [redirect, login],
  );
  return (
    <FormProvider {...methods}>
      <div className="container max-w-2xl">
        <form className="flex flex-col" onSubmit={handleSubmit(handleLogin)}>
          <h1>Sign in</h1>

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
            <div className="">
              <Button
                onClick={handleCancel}
                type="button"
                variant={"outline"}
                className="mx-2"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} variant={"default"}>
                Sign in
              </Button>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default Login;
