"use client";

// import CaskCardItem from "@/components/shared/cask-card";
import { KEY_GET_CASK } from "@/lib/constants/key";
import caskServices from "@/services/cask";
import { useQuery } from "@tanstack/react-query";
import FormFilter from "./filter";

export default function ListModule() {
    const casksQuery = useQuery({
        queryKey: [KEY_GET_CASK],
        queryFn: caskServices.getAllCasks,
    });
    console.log(casksQuery);
    // TODO: filter list
    return (
        <div className="pt-12">
            <div className="container">
                <div className="relative grid grid-cols-16 gap-7">
                    <div className="sticky top-0 col-start-1 col-end-4 h-max min-h-[50vh] rounded-lg bg-white-900">
                        {/* {filterList && (
                            <FilterList
                                filterList={filterList}
                                setParams={setParams}
                            />
                        )} */}
                    </div>
                    {/* <div className="col-span-8">
                        <div className="fex-row flex flex-wrap gap-7">
                            {casksQuery?.data &&
                                casksQuery.data.map((cask: any) => {
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
                        </div> */}
                    {/* </div> */}
                    <FormFilter />
                </div>
            </div>
        </div>
    );
}
