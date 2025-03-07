"use client";
import CredentialsHead from "@/components/shared/auth/credentials-head";
import CredentialsSignInForm from "@/components/shared/auth/credentials-signin-form";
export default function SignInModule() {
    return (
        <div className="flex flex-col">
            <CredentialsHead title="Sign In" />
            <CredentialsSignInForm />
        </div>
    );
}
