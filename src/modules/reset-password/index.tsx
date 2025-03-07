import CredentialsHead from "@/components/shared/auth/credentials-head";
import CredentialsUpdatePasswordForm from "@/components/shared/auth/credentials-update-password-form";
import CredentialsForgotPasswordForm from "@/components/shared/auth/credentials-forgot-password-form";


export default function ForgotPasswordModule() {
    return (
        <div className="flex flex-col">
            <CredentialsHead
                title="Reset password"
                desc="Please enter your account's email address"
                breadcrumb
            />
            <div className="pb-4">
                <CredentialsForgotPasswordForm />
            </div>
        </div>
    );
}

export function UpdatePasswordModule() {
    return (
        <div className="flex flex-col">
            <CredentialsHead title="Reset password" breadcrumb />
            <div className="pb-4">
                <CredentialsUpdatePasswordForm />
            </div>
        </div>
    );
}
