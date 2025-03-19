"use client";
import AuthStatus from "@/components/shared/auth/auth-status";
import CredentialsHead from "@/components/shared/auth/credentials-head";
import CredentialsSignUpForm from "@/components/shared/auth/credentials-signup-form";
import useGetMutationState from "@/hooks/useGetMutationState";
import { KEY_SIGNUP } from "@/lib/constants/key";
import { ROUTE_AUTH } from "@/lib/constants/route";
import { TRegisterUser } from "@/types";
import { redirect } from "next/navigation";

export default function SignUpModule() {
    const data = useGetMutationState<TRegisterUser>({
        key: KEY_SIGNUP,
    });
    if (data?.status === "success") {
        return (
            <AuthStatus
                status="success"
                title={`Welcome aboard, ${data?.data?.firstName}!`}
                buttonText="Back to sign up"
                action={() => redirect(ROUTE_AUTH.LOGIN)}
            >
                To activate your account and start exploring CaskExchange
                Platform, please verify your account by clicking the link we
                just sent to your email address.
            </AuthStatus>
        );
    }

    return (
        <div className="flex flex-col">
            <CredentialsHead title="Create new account" />
            <CredentialsSignUpForm />
        </div>
    );
}
