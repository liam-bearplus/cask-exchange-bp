import CredentialsHead from "@/components/shared/auth/credentials-head";
import CredentialsSignInForm from "@/components/shared/auth/credentials-signin-form";
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
