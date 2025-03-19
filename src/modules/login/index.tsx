"use client";
import CredentialsHead from "@/components/shared/auth/credentials-head";
import CredentialsSignInForm from "@/components/shared/auth/credentials-signin-form";
export default function LoginModule() {
    return (
        <div className="flex flex-col">
            <CredentialsHead title="Log in" />
            <CredentialsSignInForm />
        </div>
    );
}
