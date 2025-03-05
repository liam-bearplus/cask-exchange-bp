
import { Metadata } from "next";
import { auth } from "@/config/auth";
import CredentialsSignInForm from "@/components/shared/auth/credentials-signin-form";
import { redirect } from "next/navigation";
import CredentialsHead from "@/components/shared/auth/credentials-head";

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
    <div className="flex flex-col">
      <CredentialsHead title="Sign In" />
      <div className="pb-4">
        <CredentialsSignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
