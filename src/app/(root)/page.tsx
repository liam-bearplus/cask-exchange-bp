import HomeModule from "@/modules/home";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Home Page",
};

const HomePage = async () => {
    return <HomeModule />;
};

export default HomePage;
