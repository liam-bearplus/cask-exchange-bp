import CaskCardItem from "@/components/shared/cask-card";
import { KEY_GET_CASK } from "@/lib/constants/key";
import { PARAMS } from "@/lib/constants/route";
import caskServices from "@/services/cask";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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
        <div className="col-span-9">
            {casksQuery.isLoading ? (
                <div>Loading...</div>
            ) : casksQuery.isError ? (
                <div>Error: {casksQuery.error?.message}</div>
            ) : (
                <div className="fex-row flex flex-wrap gap-7">
                    {casksQuery.data?.data?.map((cask) => (
                        <CaskCardItem key={cask.id} data={cask} />
                    ))}
                </div>
            )}
        </div>
    );
}
