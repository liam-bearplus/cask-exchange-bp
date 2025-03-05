import SignInModule from "@/modules/signin";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const { callbackUrl } = await props.searchParams;

  const session = await getServerSession();
  if (session) {
    return redirect(callbackUrl || "/");
  }

  return <SignInModule />;
};

export default SignInPage;
