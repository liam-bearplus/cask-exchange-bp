import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ForgotPasswordModule from "@/modules/forgot-password";

export const metadata: Metadata = {
    title: "Forgot Password",
};

const ForgotPasswordPage = async (props: {
    searchParams: Promise<{
        callbackUrl: string;
    }>;
}) => {
    const { callbackUrl } = await props.searchParams;

    const session = await getServerSession();

    if (session) {
        return redirect(callbackUrl || "/");
    }

    return <ForgotPasswordModule />;
};

export default ForgotPasswordPage;
