"use client";

import ListCask from "@/components/shared/list-casks";
import { KEY_DISTILLERIES_LIST, KEY_LIST_CASK } from "@/lib/constants/key";
import caskServices from "@/services/cask";
import distilleriesServices from "@/services/distilleries";
import { useQuery } from "@tanstack/react-query";
import Banner from "./banner";
import Transparency from "./transparency";
import TableCask from "./table-cask";

export default function HomeModule() {
    const recentReview = useQuery({
        queryKey: [`${KEY_LIST_CASK}`],
        queryFn: () => caskServices.getCaskListing(""),
    });
    const distilleryQuery = useQuery({
        queryKey: [`${KEY_DISTILLERIES_LIST}`],
        queryFn: () => distilleriesServices.getDistillery(),
    });
    return (
        <div className="container grid grid-cols-12 bg-bg-main pt-[9.25rem]">
            <div className="col-start-2 -col-end-2">
                <Banner />
                <ListCask
                    type="distillery"
                    lists={distilleryQuery.data}
                    title="Popular distilleries"
                />
                <ListCask
                    type="cask"
                    lists={recentReview?.data?.data}
                    title="Recent Review"
                />
                <ListCask
                    type="cask"
                    lists={recentReview?.data?.data}
                    title="New and noteworthy"
                />
                <TableCask />
                <Transparency />
            </div>
            {/* <ListCask lists={MOCKUP_CASKS} title="New and Noteworthy" /> */}
            {/* <Warranty /> */}
            {/* <ListCask lists={MOCKUP_CASKS} title="Recommended for you" /> */}
            {/* <ListCask lists={MOCKUP_CASKS} title="Surging Casks" /> */}
        </div>
    );
}
