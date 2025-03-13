"use client";

import CredentialsHead from "@/components/shared/auth/credentials-head";
import CredentialsResetPasswordForm from "@/components/shared/auth/credentials-update-password-form";
import useGetMutationState from "@/hooks/useGetMutationState";
import { KEY_RESET_PASSWORD } from "@/lib/constants/key";
import { TRegisterUser } from "@/types";

export default function ResetPasswordModule() {
    const data = useGetMutationState<TRegisterUser>({
        key: KEY_RESET_PASSWORD,
    });
    return (
        <div className="flex flex-col">
            {data?.status === "success" ? (
                <CredentialsHead
                    title={"You have successfully reset your password"}
                    desc="Please sign in with your new password."
                    breadcrumb
                />
            ) : (
                <>
                    <CredentialsHead title="Reset password" breadcrumb />
                    <CredentialsResetPasswordForm />
                </>
            )}
        </div>
    );
}
