import CredentialsHead from "@/components/shared/auth/credentials-head";
import CredentialsSignUpForm from "@/components/shared/auth/credentials-signup-form";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUpPage = async (props: {
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
      <CredentialsHead title="Create new account" />
      <div className="pb-4">
        <CredentialsSignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
