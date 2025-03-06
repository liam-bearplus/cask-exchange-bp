"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";

import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { signUpDefaultValues } from "@/lib/constants";
import { registerUser } from "@/services/auth";
import { TRegisterUser } from "@/types";
import { signUpFormSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDisableButtonForm } from "@/hooks/useDisableButtonForm";


const CredentialsSignUpForm = () => {
  const registrationMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: ({ data: data } : {data: TRegisterUser}) => registerUser(data),
  });
  const onSubmit = (data: TRegisterUser) => {
    registrationMutation.mutate(
      { data }
    )
  };

  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: signUpDefaultValues,
  })

  const isDisableButton = useDisableButtonForm(form);

  const SignUpButton = () => {
    return (
      <Button disabled={isDisableButton || registrationMutation.isPending} className="w-full" variant="default">
        {registrationMutation.isPending ? "Submitting..." : "Create new account"}
      </Button>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="sign-up">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-x-3 gap-y-4">
            <FormField name="firstName" control={form.control} render={({ field }) => (
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">First name</Label>
                  <FormControl>
                    <Input
                      id="firstName"
                      type="text"
                      required
                      autoComplete="given-name"
                      placeholder="Ex: John"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />
            <FormField name="lastName" control={form.control} render={({ field }) => (
                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Last name</Label>
                  <FormControl>
                    <Input
                      id="lastName"
                      type="text"
                      required
                      autoComplete="family-name"
                      placeholder="Ex: Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />
            <FormField name="phoneNumber" control={form.control} render={({ field }) => (
                <div className="space-y-1.5">
                  <Label htmlFor="phoneNumber">Phone</Label>
                  <FormControl>
                    <Input
                      id="phoneNumber"
                      type="text"
                      required
                      autoComplete="tel"
                      placeholder="000-000-000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />
            <FormField name="inviteCode" control={form.control} render={({ field }) => (
                <div className="space-y-1.5">
                  <Label htmlFor="inviteCode">Invite code</Label>
                  <FormControl>
                    <Input
                      id="inviteCode"
                      type="text"
                      autoComplete="off"
                      placeholder="Invite code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />
          </div>
          <Separator/>
          <div className="space-y-4">
            <FormField name="email" control={form.control} render={({ field }) => (
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="Ex: johndoe@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />
            <FormField name="password" control={form.control} render={({ field }) => (
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      required
                      autoComplete="password"
                      placeholder="•••••••••"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />
          </div>
          <div className="flex items-start content-start space-x-2">
            <Checkbox id="remember" className="mt-0.5"/>
            <Label htmlFor="remember" className="text-typo-disable font-normal">
              I have read and agree to the <Link href='#' target="_blank" className="text-typo-body text-underline">Terms of Service</Link> and <Link href='#' target="_blank" className="text-typo-body text-underline">Privacy Policy</Link>
            </Label>
          </div>
          <div>
            <SignUpButton />
          </div>
          <div className="text-base text-center text-typo-disable">
            Already have an account?{" "}
            <Link href="/sign-in" target="_self" className="text-typo-body text-underline">
              Sign in
            </Link>
          </div>
        </div>      
      </form>
    </Form>
  );
};

export default CredentialsSignUpForm;
