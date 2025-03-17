import SignInModule from "@/modules/signin";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In",
};

const SignInPage = async () => {
    return <SignInModule />;
};

export default SignInPage;
