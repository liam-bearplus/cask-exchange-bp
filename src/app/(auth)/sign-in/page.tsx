import { Metadata } from "next";
import { auth } from "@/config/auth";
import { redirect } from "next/navigation";
import SignInModule from "@/modules/signin";

export const metadata: Metadata = {
  title: "Sign In",
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
    <SignInModule />
  );
};

export default SignInPage;
