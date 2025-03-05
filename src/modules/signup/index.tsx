import CredentialsHead from "@/components/shared/auth/credentials-head";
import CredentialsSignUpForm from "@/components/shared/auth/credentials-signup-form";

export default function SignUpModule() {
    return (
        <div className="flex flex-col">
            <CredentialsHead title="Create new account" />
            <div className="pb-4">
                <CredentialsSignUpForm />
            </div>
        </div>
    )
}