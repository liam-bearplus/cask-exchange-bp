import { Metadata } from "next";
import { auth } from "@/config/auth";
import { redirect } from "next/navigation";
import ResetPasswordModule from "@/modules/reset-password";

export const metadata: Metadata = {
  title: "Reset Password",
};

const SignInPage = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const { callbackUrl } = await props.searchParams;

  const session = await auth();
  
  if (session) {
    return redirect(callbackUrl || "/");
  }

  return (
    <ResetPasswordModule />
  );
};

export default SignInPage;
