"use client";

import CaskCardItem from "@/components/shared/cask-card";
// import CaskCardItem from "@/components/shared/cask-card";
import { useQuery } from "@tanstack/react-query";
import FilterList from "./filter-list";
import { useState } from "react";
import FormFilter from "./filter";

export default function ListModule() {
    const [params, setParams] = useState("");
    const searchQuery = useQuery({
        queryKey: ["search"],
        queryFn: async () => {
            const result = await fetch(
                "https://api.sampleapis.com/wines/reds"
            ).then((res) => res.json());
            const resultMap = result.filter((item, index) => {
                if (index < 100) {
                    return item;
                }
            });
            return resultMap;
        },
    });
    const filterList = searchQuery?.data?.reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (acc: { [key: string]: any }, cask: { winery: string }) => {
            const formatCate = cask.winery.split(" ").join("-").toLowerCase();
            if (acc?.[formatCate]) {
                acc[formatCate].push(cask);
            } else {
                acc[formatCate] = [cask];
            }
            return acc;
        },
        {}
    );

    return (
        <div className="pt-12">
            <div className="container">
                <div className="grid-cols-16 relative grid gap-7">
                    <div className="sticky top-0 col-start-1 col-end-4 h-max min-h-[50vh] rounded-lg bg-white-900">
                        {/* {filterList && (
                            <FilterList
                                filterList={filterList}
                                setParams={setParams}
                            />
                        )} */}
                    </div>
                    <div className="col-span-8">
                        <div className="fex-row flex flex-wrap gap-7">
                            {searchQuery?.data &&
                                searchQuery.data.map((cask: any) => {
                                    return (
                                        <CaskCardItem
                                            key={cask.id}
                                            data={{
                                                name: cask.name,
                                                imageUrl: cask.image,
                                            }}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                    <FormFilter />
                </div>
            </div>
        </div>
    );
}
