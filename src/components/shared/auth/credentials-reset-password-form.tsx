"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResetPasswordDefaultValues } from "@/lib/constants";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";

const CredentialsResetPasswordForm = () => {
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

  const ResetPasswordButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? "Submitting..." : "Continue"}
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
              defaultValue={ResetPasswordDefaultValues.email}
            />
          </div>
        </div>
        <div>
          <ResetPasswordButton />
        </div>
        {data && !data.success && (
          <p className="text-center text-destructive">{data.message}</p>
        )}
      </div>
    </form>
  );
};

export default CredentialsResetPasswordForm;
