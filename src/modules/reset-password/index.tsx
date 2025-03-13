"use client";

import CredentialsHead from "@/components/shared/auth/credentials-head";
import CredentialsResetPasswordForm from "@/components/shared/auth/credentials-update-password-form";
import { KEY_RESET_PASSWORD } from "@/lib/constants/key";
import { TRegisterUser } from "@/types";
import { useMutationState } from "@tanstack/react-query";

export default function ResetPasswordModule() {
    const data = useMutationState({
        filters: { mutationKey: [KEY_RESET_PASSWORD] },
        select: (mutation) => ({
            status: mutation.state.status,
            data: mutation.state.data as TRegisterUser,
        }),
    })[0];
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
