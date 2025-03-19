import LoginModule from "@/modules/login";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Log In",
};

const LogInPage = async () => {
    return <LoginModule />;
};

export default LogInPage;
