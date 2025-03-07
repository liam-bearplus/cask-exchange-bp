import CredentialsHead from "@/components/shared/auth/credentials-head";
import CredentialsUpdatePasswordForm from "@/components/shared/auth/credentials-update-password-form";
import CredentialsForgotPasswordForm from "@/components/shared/auth/credentials-forgot-password-form";


export default function ForgotPasswordModule() {
    return (
        <div className="flex flex-col">
            <CredentialsHead title="Reset password" desc="Please enter your account's email address" breadcrumb/>
            {/* <CredentialsHead title="Check your mail box" desc="Please follow the instruction in your mailbox to reset your password." breadcrumb/> */}
            <CredentialsForgotPasswordForm />
        </div>
    );
}

export function UpdatePasswordModule() {
    return (
        <div className="flex flex-col">
            <CredentialsHead title="Reset password" breadcrumb />
            <CredentialsUpdatePasswordForm />
        </div>
    );
}
