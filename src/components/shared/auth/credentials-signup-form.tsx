"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpDefaultValues } from "@/lib/constants";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

const CredentialsSignUpForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [data, action] = useActionState(
    () => {
      return { success: false, message: "" };
    },
    {
      success: false,
      message: "",
    }
  );

  const SignUpButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? "Submitting..." : "Create new account"}
      </Button>
    );
  };

  return (
    <form id="sign-up" action={action}>
      <input type="hidden" value={callbackUrl} name="callbackUrl" />
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-x-3 gap-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              placeholder="Ex: John"
              defaultValue={signUpDefaultValues.firstName}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Ex: Doe"
              defaultValue={signUpDefaultValues.lastName}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="number"
              required
              autoComplete="tel"
              placeholder="000-000-000"
              defaultValue={signUpDefaultValues.phone}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="inviteCode">Invite code</Label>
            <Input
              id="inviteCode"
              name="inviteCode"
              type="text"
              autoComplete="off"
              placeholder="Invite code"
              defaultValue={signUpDefaultValues.inviteCode}
            />
          </div>
        </div>
        <Separator/>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              defaultValue={signUpDefaultValues.email}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              variant="password"
              required
              autoComplete="password"
              placeholder="•••••••••"
              defaultValue={signUpDefaultValues.password}
            />
          </div>
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
        {data && !data.success && (
          <p className="text-center text-destructive">{data.message}</p>
        )}
        <div className="text-base text-center text-typo-disable">
          Already have an account?{" "}
          <Link href="/sign-up" target="_self" className="text-typo-body text-underline">
            Sign in
          </Link>
        </div>
      </div>      
    </form>
  );
};

export default CredentialsSignUpForm;
