"use client";
import CredentialsHead from "@/components/shared/auth/credentials-head";
import CredentialsSignUpForm from "@/components/shared/auth/credentials-signup-form";
import SignupSuccess from "@/components/shared/auth/signup-success";
import useGetMutationState from "@/hooks/useGetMutationState";
import { KEY_SIGNUP } from "@/lib/constants/key";
import { TRegisterUser } from "@/types";

export default function SignUpModule() {
    const data = useGetMutationState<TRegisterUser>({
        key: KEY_SIGNUP,
    });
    if (data?.status === "success") {
        return <SignupSuccess name={data?.data?.firstName} />;
    }

    return (
        <div className="flex flex-col">
            <CredentialsHead title="Create new account" />
            <CredentialsSignUpForm />
        </div>
    );
}
