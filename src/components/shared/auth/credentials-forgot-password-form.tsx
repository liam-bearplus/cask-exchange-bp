"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDisableButtonForm } from "@/hooks/useDisableButtonForm";
import { ForgotPasswordDefaultValues } from "@/lib/constants";
import { forgotPasswordFormSchema } from "@/lib/validators";
import { forgotPassword } from "@/services/auth";
import { TForgotPassword } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const CredentialsForgotPasswordForm = () => {
  const forgotPasswordMutation = useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: ({ data: data } : {data: TForgotPassword}) => forgotPassword(data.email),
  })

  const onSubmit = (data: TForgotPassword) => {
    forgotPasswordMutation.mutate(
      { data }
    )
  }

  const form = useForm({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: ForgotPasswordDefaultValues,
  })

  const isDisableButton = useDisableButtonForm(form);

  const ForgotPasswordButton = () => {
    return (
      <Button disabled={isDisableButton || forgotPasswordMutation.isPending} className="w-full" variant="default">
        {forgotPasswordMutation.isPending ? "Submitting..." : "Continue"}
      </Button>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="forgot-password">
        <div className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <FormControl>
                    <Input
                      id="email"
                      type="text"
                      autoComplete="email"
                      placeholder="Ex: johndoe@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />
          </div>
          <div>
            <ForgotPasswordButton />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CredentialsForgotPasswordForm;
