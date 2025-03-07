"use client";
import CredentialsHead from "@/components/shared/auth/credentials-head";
import CredentialsSignUpForm from "@/components/shared/auth/credentials-signup-form";
import SignupSuccess from "@/components/shared/auth/signup-success";
import { KEY_REGISTER } from "@/lib/constants/key";
import { TRegisterUser } from "@/types";
import { useMutationState } from "@tanstack/react-query";

export default function SignUpModule() {
    const data = useMutationState({
        filters: { mutationKey: [KEY_REGISTER] },
        select: (mutation) => ({
            status: mutation.state.status,
            data: mutation.state.data as TRegisterUser,
        }),
    })[0];

    console.log("data", data);
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
