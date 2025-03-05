
import CredentialsHead from "@/components/shared/auth/credentials-head";
import CredentialsSignInForm from "@/components/shared/auth/credentials-signin-form";

export default function SignInModule() {
    return (
        <div className="flex flex-col">
            <CredentialsHead title="Sign In" />
            <div className="pb-4">
                <CredentialsSignInForm />
            </div>
        </div>
    )
}