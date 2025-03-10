"use client";

import CredentialsHead from "@/components/shared/auth/credentials-head";
import CredentialsUpdatePasswordForm from "@/components/shared/auth/credentials-update-password-form";
import CredentialsForgotPasswordForm from "@/components/shared/auth/credentials-forgot-password-form";
import { useMutationState } from "@tanstack/react-query";
import { KEY_FORGOT_PASSWORD } from "@/lib/constants/key";
import { TRegisterUser } from "@/types";
import { useSearchParams } from "next/navigation";

export default function ForgotPasswordModule() {
    const searchParams = useSearchParams();
    const isResetSuccess = searchParams.get("reset") === "true";
    // localhost:3000/reset-password?reset=true
    const data = useMutationState({
        filters: { mutationKey: [KEY_FORGOT_PASSWORD] },
        select: (mutation) => ({
            status: mutation.state.status,
            data: mutation.state.data as TRegisterUser,
        }),
    })[0];

    if (isResetSuccess) {
        return <UpdatePasswordModule />;
    }

    return (
        <div className="flex flex-col">
            {data?.status === "success" ? (
                <CredentialsHead
                    title="Check your mail box"
                    desc="Please follow the instruction in your mailbox to reset your password."
                    breadcrumb
                />
            ) : (
                <>
                    <CredentialsHead
                        title="Reset password"
                        desc="Please enter your account's email address"
                        breadcrumb
                    />
                    <CredentialsForgotPasswordForm />
                </>
            )}
        </div>
    );
}

export function UpdatePasswordModule() {
    return (
        <div className="flex flex-col">
            <CredentialsHead title="Reset password" breadcrumb />
            <CredentialsUpdatePasswordForm />
        </div>
    );
}
