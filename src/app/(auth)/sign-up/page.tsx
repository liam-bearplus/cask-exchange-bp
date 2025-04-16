import SignUpModule from "@/modules/signup";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up",
};

const SignUpPage = async () => {
    return <SignUpModule />;
};

export default SignUpPage;
