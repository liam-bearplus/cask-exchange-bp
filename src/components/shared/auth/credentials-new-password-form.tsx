"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NewPasswordDefaultValues } from "@/lib/constants";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";

const CredentialsNewPasswordForm = () => {
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

  const NewPasswordButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? "Submitting..." : "Done"}
      </Button>
    );
  };

  return (
    <form id="sign-in" action={action}>
      <input type="hidden" value={callbackUrl} name="callbackUrl" />
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">New password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              variant="password"
              required
              autoComplete="off"
              placeholder="Enter your new password"
              defaultValue={NewPasswordDefaultValues.password}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Confirm new password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              variant="password"
              required
              autoComplete="off"
              placeholder="Enter your new password"
              defaultValue={NewPasswordDefaultValues.password}
            />
          </div>
        </div>
        <div>
          <NewPasswordButton />
        </div>
        {data && !data.success && (
          <p className="text-center text-destructive">{data.message}</p>
        )}
      </div>
    </form>
  );
};

export default CredentialsNewPasswordForm;
