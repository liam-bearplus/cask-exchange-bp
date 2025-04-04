import CaskCardItem from "@/components/shared/cask-card";
import { KEY_GET_CASK } from "@/lib/constants/key";
import caskServices from "@/services/cask";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CaskList() {
    const params = useSearchParams();
    const [changeParams, setChangeParams] = useState("");
    const filterData = params.get("filter?");
    const [size, setSize] = useState(20);
    const [page, setPage] = useState(1);

    const casksQuery = useQuery({
        queryKey: [KEY_GET_CASK, changeParams, size, page],
        queryFn: () => {
            return caskServices.getCaskListing(
                `${changeParams}&size=${size}&page=${page}`
            );
        },
    });
    useEffect(() => {
        setChangeParams(filterData || "");
        setSize(20);
        setPage(1);
    }, [filterData]);
    return (
        <div className="col-span-12">
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
