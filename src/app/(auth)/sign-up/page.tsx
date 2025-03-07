import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignUpModule from "@/modules/signup";

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

    return <SignUpModule />;
};

export default SignUpPage;
