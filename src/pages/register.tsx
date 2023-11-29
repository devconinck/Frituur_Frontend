// Register.tsx
import { NextPage } from "next";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useAuth } from "~/contexts/auth.contexts";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/router";
import { useCallback } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "~/components/ui/alert-dialog";

interface FormData {
  name: string;
  email: string;
  password: string;
}

function LabelInput({ label, name, type, validationRules, ...rest }: any) {
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
  name: {
    required: "Name is required",
  },
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

const Register: NextPage = () => {
  const { registerError, registerLoading, register: registerUser } = useAuth();
  const methods = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const { handleSubmit, reset } = methods;

  const handleCancel = () => {
    reset();
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = useCallback(
    async (data: FormData) => {
      const registered = await registerUser(
        data.name,
        data.email,
        data.password,
      );

      if (registered) {
        router.push("/login");
        console.log("registered");
      }
    },
    [registerUser],
  );

  return (
    <AlertDialog defaultOpen>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <FormProvider {...methods}>
          <div className="container max-w-2xl">
            <form
              className="flex flex-col"
              onSubmit={handleSubmit(handleRegister)}
            >
              <AlertDialogHeader>Create an account</AlertDialogHeader>
              <AlertDialogDescription>
                <LabelInput
                  label="Name"
                  type="text"
                  name="name"
                  placeholder="Joske Vermeulen"
                  validationRules={validationRules.name}
                />

                <LabelInput
                  label="Email"
                  type="text"
                  name="email"
                  placeholder="your@email.com"
                  validationRules={validationRules.email}
                />

                <LabelInput
                  label="Password"
                  type="password"
                  name="password"
                  validationRules={validationRules.password}
                />
              </AlertDialogDescription>
              <AlertDialogFooter>
                <div className=" flex justify-end">
                  <div className="">
                    <AlertDialogAction onClick={handleLogin} className="mx-2">
                      I already have an account
                    </AlertDialogAction>

                    <AlertDialogAction type="submit" disabled={registerLoading}>
                      Register
                    </AlertDialogAction>
                  </div>
                </div>
              </AlertDialogFooter>
            </form>
          </div>
        </FormProvider>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Register;
