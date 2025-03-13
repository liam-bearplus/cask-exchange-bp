"use client";

import CredentialsForgotPasswordForm from "@/components/shared/auth/credentials-forgot-password-form";
import CredentialsHead from "@/components/shared/auth/credentials-head";
import { KEY_FORGOT_PASSWORD } from "@/lib/constants/key";
import { TRegisterUser } from "@/types";
import { useMutationState } from "@tanstack/react-query";

export default function ForgotPasswordModule() {
    const data = useMutationState({
        filters: { mutationKey: [KEY_FORGOT_PASSWORD] },
        select: (mutation) => ({
            status: mutation.state.status,
            data: mutation.state.data as TRegisterUser,
        }),
    })[0];

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
