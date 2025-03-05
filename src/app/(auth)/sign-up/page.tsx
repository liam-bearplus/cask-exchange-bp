import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import { auth } from "@/config/auth";
import { redirect } from "next/navigation";
import CredentialsSignUpForm from "@/components/shared/auth/credentials-signup-form";
import CredentialsHead from "@/components/shared/auth/credentials-head";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUpPage = async (props: {
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
      <CredentialsHead title="Create new account" />
      <div className="pb-4">
        <CredentialsSignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
