
import CredentialsHead from "@/components/shared/auth/credentials-head";
import CredentialsNewPasswordForm from "@/components/shared/auth/credentials-new-password-form";
import CredentialsResetPasswordForm from "@/components/shared/auth/credentials-reset-password-form";


export default function ResetPasswordModule() {
    return (
        <div className="flex flex-col">
            <CredentialsHead title="Reset password" desc="Please enter your account's email address" breadcrumb/>
            <div className="pb-4">
                <CredentialsResetPasswordForm />
            </div>
        </div>
    )
}

export function NewPasswordModule() {
    return (
        <div className="flex flex-col">
            <CredentialsHead title="Reset password" breadcrumb/>
            <div className="pb-4">
                <CredentialsNewPasswordForm />
            </div>
        </div>
    )
}