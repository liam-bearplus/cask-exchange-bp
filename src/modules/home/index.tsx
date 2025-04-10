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
        <div className="container grid grid-cols-12 bg-bg-main pt-10">
            <div className="col-start-2 -col-end-2">
                <ListCask
                    type="cask"
                    lists={MOCKUP_CASKS}
                    title="Recent Review"
                />
                <ListCask
                    type="cask"
                    lists={MOCKUP_CASKS}
                    title="New and noteworthy"
                />
            </div>
            {/* <Banner /> */}
            {/* <ListCask lists={MOCKUP_CASKS} title="New and Noteworthy" /> */}
            {/* <Warranty /> */}
            {/* <ListCask lists={MOCKUP_CASKS} title="Recommended for you" /> */}
            {/* <ListCask lists={MOCKUP_CASKS} title="Surging Casks" /> */}
        </div>
    );
}
