import ForgotPasswordModule from "@/modules/forgot-password";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forgot Password",
};

const ForgotPasswordPage = async () => {
    return <ForgotPasswordModule />;
};

export default ForgotPasswordPage;
