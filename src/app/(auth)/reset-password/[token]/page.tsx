import { Metadata } from "next";
import { auth } from "@/config/auth";
import { redirect } from "next/navigation";
import { NewPasswordModule } from "@/modules/reset-password";

export const metadata: Metadata = {
  title: "Reset Password",
};

const NewPasswordPage = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>,
  params: Promise<{
    token: string;
  }>
}) => {
  const { token } = await props.params;
  console.log(token)
  const { callbackUrl } = await props.searchParams;

  const session = await auth();
  
  if (session) {
    return redirect(callbackUrl || "/");
  }

  return (
    <NewPasswordModule />
  );
};

export default NewPasswordPage;
