import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { User, useAuth } from "~/contexts/auth.contexts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCustomer } from "~/api/customers";
import { useCallback } from "react";

const accountFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm() {
  const { user } = useAuth() as { user: User };
  const queryClient = useQueryClient();

  const defaultValues: Partial<AccountFormValues> = {
    firstName: user?.name ? user.name : "",
    lastName: "",
  };

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  const updateCustomerMutation = useMutation({
    mutationFn: updateCustomer,
  });

  const onSubmit = useCallback(
    async (values: AccountFormValues) => {
      const { firstName, lastName } = values;

      updateCustomerMutation.mutate({
        id: user.id,
        name: firstName,
        lastName,
      });
    },
    [updateCustomerMutation, user?.id],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="your first name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="your last name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
