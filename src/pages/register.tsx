import { NextPage } from "next";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useAuth } from "~/contexts/auth.contexts";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/router";
import { useCallback } from "react";
import LabelInput from "~/components/LabelInput";

interface FormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
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
  const { error, loading, register } = useAuth() as {
    error: any;
    loading: boolean;
    register: (
      name: string,
      email: string,
      password: string,
      passwordConfirm: string,
    ) => Promise<boolean>;
  };
  const methods = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const router = useRouter();
  const { handleSubmit } = methods;

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = useCallback(
    async (data: FormData) => {
      const registered = await register(
        data.name,
        data.email,
        data.password,
        data.passwordConfirm,
      );

      if (registered) {
        router.push("/");
      }
    },
    [register, router],
  );

  return (
    <div>
      <FormProvider {...methods}>
        <div className="container max-w-2xl">
          <form
            className="flex flex-col"
            onSubmit={handleSubmit(handleRegister)}
          >
            <h1 className="text-2xl font-bold">Create an account</h1>
            <div>
              <LabelInput
                label="Name"
                type="text"
                name="name"
                //@ts-ignore
                placeholder="Joske Vermeulen"
                validationRules={validationRules.name}
              />

              <LabelInput
                label="Email"
                type="text"
                name="email"
                //@ts-ignore
                placeholder="your@email.com"
                validationRules={validationRules.email}
              />

              <LabelInput
                label="Password"
                type="password"
                name="password"
                validationRules={validationRules.password}
              />
              <LabelInput
                label="Confirm password"
                type="password"
                name="passwordConfirm"
                validationRules={validationRules.password}
              />
            </div>
            <div className=" flex justify-end">
              <div className="">
                <Button onClick={handleLogin} className="mx-2">
                  I already have an account
                </Button>

                <Button type="submit" disabled={loading}>
                  Register
                </Button>
              </div>
            </div>
          </form>
        </div>
      </FormProvider>
    </div>
  );
};

export default Register;
