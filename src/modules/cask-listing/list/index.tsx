import CaskCardItem from "@/components/shared/cask-card";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { KEY_GET_CASK, KEY_WHOAMI } from "@/lib/constants/key";
import { PARAMS } from "@/lib/constants/route";
import authService from "@/services/auth";
import caskServices from "@/services/cask";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function CaskList() {
    const params = useSearchParams();
    const [changeParams, setChangeParams] = useState("");
    const filterData = params.get(`${PARAMS.filter}`);
    const sortData = params.get(PARAMS.sortBy);
    const [size, setSize] = useState(20);
    const [page, setPage] = useState(1);

    const casksQuery = useQuery({
        queryKey: [KEY_GET_CASK, changeParams, size, page],
        queryFn: () => {
            return caskServices.getCaskListing(
                `${changeParams}&${PARAMS.limit}=${size}&${PARAMS.page}=${page}`
            );
        },
        placeholderData: (prev) => prev,
    });

    const whoamiQuery = useQuery({
        queryKey: [KEY_GET_CASK, KEY_WHOAMI],
        queryFn: () => {
            return authService.whoami;
        },
        placeholderData: (prev) => prev,
    });
    console.log("whoamiQuery", whoamiQuery.data);

    const sizeParams = casksQuery.data?.size || 0;
    const pageParams = casksQuery.data?.page || 0;
    const totalRecords = casksQuery.data?.totalRecords || 0;
    const totalPages = casksQuery.data?.totalPages || 0;
    const visibleItems = 7;

    const dataPagination = useCallback(() => {
        const idCenter = Math.floor(totalPages / 2);
        const distance = Math.round((totalPages - visibleItems) / 2) + 1;
        const newArray = Array.from({ length: totalPages }, (_, i) => {
            if (
                i !== idCenter &&
                idCenter - distance < i &&
                idCenter + distance > i &&
                i !== totalPages - 1 &&
                i !== 0
            ) {
                return null;
            }
            return i + 1;
        }).filter(Boolean);
        return newArray;
    }, [sizeParams, pageParams, totalPages]);

    useEffect(() => {
        const params = [
            filterData && `${filterData}`,
            sortData && `${PARAMS.sortBy}=${sortData}`,
        ]
            .filter(Boolean)
            .join("&");

        setChangeParams(params || "");
        setSize(20);
        setPage(1);
    }, [filterData, sortData]);

    return (
        <div className="w-full">
            {casksQuery.isLoading ? (
                <div>Loading...</div>
            ) : casksQuery.isError ? (
                <div>Error: {casksQuery.error?.message}</div>
            ) : casksQuery.data?.data?.length === 0 ? (
                <div>No data found</div>
            ) : (
                <div className="flex flex-col">
                    <div className="mb-20 grid grid-cols-10 flex-wrap gap-x-10 gap-y-12">
                        {casksQuery.data?.data?.map((cask) => (
                            <CaskCardItem
                                className="col-span-2"
                                key={cask.id}
                                data={cask}
                                isRevert={false}
                                index={0}
                            />
                        ))}
                    </div>
                    <div className="mb-[4.625rem] flex w-full items-center justify-between border-t border-bd-main pt-5">
                        <Pagination>
                            <PaginationContent>
                                {dataPagination().map((num, i, args) => {
                                    const idCenter = Math.floor(
                                        args.length / 2
                                    );
                                    const isCenter =
                                        (i === idCenter + page - 1 &&
                                            i !== totalPages - 1) ||
                                        (i === page - 1 - idCenter && i !== 0);
                                    const isActive = num === pageParams;

                                    return (
                                        <PaginationItem key={i}>
                                            <PaginationLink
                                                onClick={() => {
                                                    if (isCenter) return;
                                                    setPage(num as number);
                                                }}
                                                className={
                                                    isActive ? "bg-bg-sf1" : ""
                                                }
                                                isActive={isActive}
                                            >
                                                {isCenter ? "..." : num}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                })}
                            </PaginationContent>
                        </Pagination>
                        <div className="whitespace-nowrap text-base">
                            Showing{" "}
                            <span className="font-medium">
                                {sizeParams * pageParams - sizeParams + 1} -{" "}
                                {sizeParams * pageParams}{" "}
                            </span>{" "}
                            of{" "}
                            <span className="font-medium">{totalRecords}</span>{" "}
                            results
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
