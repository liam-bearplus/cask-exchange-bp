"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInDefaultValues } from "@/lib/constants";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

const CredentialsSignInForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [data, action] = useActionState(
    () => {
      return {
        success: false,
        message: "",
      };
    },
    {
      success: false,
      message: "",
    }
  );

  const SignInButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? "Logging In..." : "Login"}
      </Button>
    );
  };

  return (
    <form id="sign-in" action={action}>
      <input type="hidden" value={callbackUrl} name="callbackUrl" />
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Ex: johndoe@gmail.com"
              defaultValue={signInDefaultValues.email}
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
              defaultValue={signInDefaultValues.password}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-start content-start space-x-2">
            <Checkbox id="remember" className="mt-0.5"/>
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Link href="/forgot-password" target="_self" className="text-base text-typo-body text-underline">Forgot password?</Link>
        </div>
        <div>
          <SignInButton />
        </div>
        {data && !data.success && (
          <p className="text-center text-destructive">{data.message}</p>
        )}
        <div className="text-base text-center text-typo-disable">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" target="_self" className="text-typo-body text-underline">
            Sign up
          </Link>{" "}
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
