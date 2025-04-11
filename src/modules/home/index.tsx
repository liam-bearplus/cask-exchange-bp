"use client";

import ListCask, { ListCaskSkeleton } from "@/components/shared/list-casks";
import { KEY_DISTILLERIES_LIST, KEY_LIST_CASK } from "@/lib/constants/key";
import caskServices from "@/services/cask";
import distilleriesServices from "@/services/distilleries";
import { useQuery } from "@tanstack/react-query";
import Banner from "./banner";
import Transparency, { TransparencySkeleton } from "./transparency";
import TableCask, { TableCaskSkeleton } from "./table-cask";
import { MOCKUP_CASKS } from "@/lib/constants/mockup.data";
import { isEmpty } from "@/lib/utils";

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
                {distilleryQuery.isLoading ? (
                    <ListCaskSkeleton type="distillery" />
                ) : (
                    <ListCask
                        type="distillery"
                        lists={distilleryQuery.data}
                        title="Popular distilleries"
                        isRevert
                    />
                )}
                {recentReview.isLoading ? (
                    <ListCaskSkeleton type="cask" />
                ) : (
                    <ListCask
                        type="cask"
                        lists={
                            isEmpty(recentReview.data?.data)
                                ? MOCKUP_CASKS
                                : recentReview.data?.data
                        }
                        title="Featured casks"
                        subTitle="Most-watched casks by investors"
                    />
                )}
                {recentReview.isLoading ? (
                    <ListCaskSkeleton type="cask" />
                ) : (
                    <ListCask
                        type="cask"
                        lists={
                            isEmpty(recentReview.data?.data)
                                ? MOCKUP_CASKS
                                : recentReview.data?.data
                        }
                        subTitle="Strongest casks on the list"
                        isRevert
                        title="High voltage picks"
                    />
                )}
                {recentReview.isLoading ? <TableCaskSkeleton /> : <TableCask />}
                {recentReview.isLoading ? (
                    <ListCaskSkeleton type="cask" />
                ) : (
                    <ListCask
                        type="cask"
                        lists={
                            isEmpty(recentReview.data?.data)
                                ? MOCKUP_CASKS
                                : recentReview.data?.data
                        }
                        subTitle="Top performers with rapid growth"
                        title="Growing rapidly"
                    />
                )}

                {recentReview.isLoading ? (
                    <ListCaskSkeleton type="cask" />
                ) : (
                    <ListCask
                        type="cask"
                        lists={
                            isEmpty(recentReview.data?.data)
                                ? MOCKUP_CASKS
                                : recentReview.data?.data
                        }
                        isRevert
                        title="Recently viewed"
                    />
                )}

                {recentReview.isLoading ? (
                    <TransparencySkeleton />
                ) : (
                    <Transparency />
                )}
            </div>
        </div>
    );
}
