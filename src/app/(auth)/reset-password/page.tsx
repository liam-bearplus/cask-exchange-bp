import ResetPasswordModule from "@/modules/reset-password";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reset Password",
};

const ResetPasswordPage = async () => {
    return <ResetPasswordModule />;
};

export default ResetPasswordPage;
