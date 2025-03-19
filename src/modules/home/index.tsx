"use client";

import ListCask from "@/components/shared/list-casks";
import { MOCKUP_CASKS } from "@/lib/constants/mockup.data";
import Banner from "./banner";
// import caskServices from "@/services/cask";
// import { useQuery } from "@tanstack/react-query";
// import { KEY_LIST_CASK } from "@/lib/constants/key";

export default function HomeModule() {
    // const recentReview = useQuery({
    //     queryKey: [`${KEY_LIST_CASK}_recent`],
    //     queryFn: caskServices.getAllCasks,
    // });
    return (
        <div>
            <Banner />
            <ListCask lists={MOCKUP_CASKS} title="Recent Review" />
            <ListCask lists={MOCKUP_CASKS} title="New and Noteworthy" />
            <ListCask lists={MOCKUP_CASKS} title="Recommended for you" />
            <ListCask lists={MOCKUP_CASKS} title="Surging Casks" />
        </div>
    );
}
