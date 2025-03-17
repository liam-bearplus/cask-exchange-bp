"use client";

import ListCask from "@/components/shared/list-casks";
import { MOCKUP_CASKS } from "@/lib/constants/mockup.data";
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
            <ListCask lists={MOCKUP_CASKS} title="Recent Review" />
        </div>
    );
}
