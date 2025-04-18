"use client";

import ListCask, { ListCaskSkeleton } from "@/components/shared/list-casks";
import {
    KEY_DISTILLERIES_LIST,
    KEY_FEATURED_CASK,
    KEY_GROWTH_CASK,
    KEY_LIST_CASK,
    KEY_RESENTLY_VIEWED,
} from "@/lib/constants/key";
import caskServices from "@/services/cask";
import distilleriesServices from "@/services/distilleries";
import { useQuery } from "@tanstack/react-query";
import Banner from "./banner";
import Transparency, { TransparencySkeleton } from "./transparency";
import TableCask, { TableCaskSkeleton } from "./table-cask";
import { MOCKUP_CASKS } from "@/lib/constants/mockup.data";
import { isEmpty } from "@/lib/utils";

export default function HomeModule() {
    const distilleryQuery = useQuery({
        queryKey: [`${KEY_DISTILLERIES_LIST}`],
        queryFn: () => distilleriesServices.getDistillery(),
    });
    const recentlyViewsQuery = useQuery({
        queryKey: [KEY_LIST_CASK, KEY_RESENTLY_VIEWED],
        queryFn: () => caskServices.getRecentViewCasks({ params: "limit=10" }),
    });
    const growthCaskQuery = useQuery({
        queryKey: [KEY_LIST_CASK, KEY_GROWTH_CASK],
        queryFn: caskServices.getGrowthCasks,
    });
    const highVoltageQuery = useQuery({
        queryKey: [KEY_LIST_CASK, KEY_GROWTH_CASK],
        queryFn: caskServices.getHighVoltageCasks,
    });
    const featuredCaskQuery = useQuery({
        queryKey: [KEY_LIST_CASK, KEY_FEATURED_CASK],
        queryFn: caskServices.getFeaturedCasks,
    });
    return (
        <div className="container grid grid-cols-12 bg-bg-main pt-[9.25rem]">
            <div className="col-start-2 -col-end-2">
                <Banner />
                {distilleryQuery.isLoading ? (
                    <ListCaskSkeleton type="distillery" />
                ) : (
                    <ListCask
                        type="distillery"
                        lists={distilleryQuery.data}
                        title="Popular distilleries"
                        isRevert
                        href="/distilleries"
                    />
                )}
                {featuredCaskQuery.isLoading ? (
                    <ListCaskSkeleton type="cask" />
                ) : (
                    <ListCask
                        type="cask"
                        lists={
                            isEmpty(featuredCaskQuery.data?.data)
                                ? MOCKUP_CASKS
                                : featuredCaskQuery.data?.data
                        }
                        title="Featured casks"
                        href="/cask-listing?type=featured"
                        subTitle="Most-watched casks by investors"
                    />
                )}
                {highVoltageQuery.isLoading ? (
                    <ListCaskSkeleton type="cask" />
                ) : (
                    <ListCask
                        type="cask"
                        lists={
                            isEmpty(highVoltageQuery.data?.data)
                                ? MOCKUP_CASKS
                                : highVoltageQuery.data?.data
                        }
                        subTitle="Strongest casks on the list"
                        isRevert
                        title="High voltage picks"
                    />
                )}
                {growthCaskQuery.isLoading ? (
                    <TableCaskSkeleton />
                ) : (
                    <TableCask />
                )}
                {growthCaskQuery.isLoading ? (
                    <ListCaskSkeleton type="cask" />
                ) : (
                    <ListCask
                        type="cask"
                        lists={
                            isEmpty(growthCaskQuery.data?.data)
                                ? MOCKUP_CASKS
                                : growthCaskQuery.data?.data
                        }
                        subTitle="Top performers with rapid growth"
                        title="Growing rapidly"
                    />
                )}

                {recentlyViewsQuery.isLoading ? (
                    <ListCaskSkeleton type="cask" />
                ) : (
                    !isEmpty(recentlyViewsQuery.data?.data) && (
                        <ListCask
                            type="cask"
                            lists={
                                isEmpty(recentlyViewsQuery.data?.data)
                                    ? MOCKUP_CASKS
                                    : recentlyViewsQuery.data?.data
                            }
                            title="Recently viewed"
                            subTitle="Casks you viewed recently"
                        />
                    )
                )}

                {recentlyViewsQuery.isLoading ? (
                    <TransparencySkeleton />
                ) : (
                    <Transparency />
                )}
            </div>
        </div>
    );
}
