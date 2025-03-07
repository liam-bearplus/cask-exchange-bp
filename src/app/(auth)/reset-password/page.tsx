import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ForgotPasswordModule from "@/modules/reset-password";

export const metadata: Metadata = {
    title: "Reset Password",
};

const ResetPasswordPage = async (props: {
    searchParams: Promise<{
        callbackUrl: string;
    }>;
}) => {
    const { callbackUrl } = await props.searchParams;

    const session = await getServerSession();

    if (session) {
        return redirect(callbackUrl || "/");
    }

  return (
    <ForgotPasswordModule />
  );
};

export default ResetPasswordPage;
