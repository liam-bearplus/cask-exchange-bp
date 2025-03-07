import { Metadata } from "next";
import { redirect } from "next/navigation";
import { UpdatePasswordModule } from "@/modules/reset-password";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
    title: "Reset Password",
};

const NewPasswordPage = async (props: {
    searchParams: Promise<{
        callbackUrl: string;
    }>;
    params: Promise<{
        token: string;
    }>;
}) => {
    const { token } = await props.params;
    console.log(token);
    const { callbackUrl } = await props.searchParams;

    const session = await getServerSession();

    if (session) {
        return redirect(callbackUrl || "/");
    }

  return (
    <UpdatePasswordModule />
  );
};

export default NewPasswordPage;
