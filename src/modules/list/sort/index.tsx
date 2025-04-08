import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams.ts";
import { PARAMS } from "@/lib/constants/route";
import { useEffect, useMemo, useState } from "react";

export function SortFilter() {
    const { updateParams, valueParams } = useUpdateSearchParams(PARAMS.sortBy);
    const [valueSelect, setValueSelect] = useState<string | undefined>(
        undefined
    );
    const handleRevertParams = useMemo(
        () => (params: string | undefined) => {
            if (!params) return undefined;
            const paramsArr = params.split("&");
            const newParams = paramsArr
                .map((param) => {
                    const splitParam = param.split("=");
                    if (splitParam[0] === PARAMS.sortOrder) {
                        return splitParam[1].toLowerCase();
                    }
                    return param;
                })
                .join("_");
            return newParams;
        },
        []
    );
    const defaultParams = handleRevertParams(valueParams);
    const handleSplitParams = (value: string) => {
        const splitParams = value.split("_");
        const newParams = splitParams
            .map((param, idx) => {
                if (idx > 0) {
                    return `${PARAMS.sortOrder}=${param.toUpperCase()}`;
                }
                return param;
            })
            .join("&");
        setValueSelect(value);
        updateParams(newParams);
    };

    useEffect(() => {
        setValueSelect(defaultParams);
    }, [defaultParams]);
    return (
        <div className="relative col-span-3">
            <div className="sticky top-[10vh]">
                <Select
                    value={valueSelect}
                    defaultValue={defaultParams}
                    onValueChange={handleSplitParams}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {/* <SelectItem value="averageGrowth_asc">
                            Average Growth (Low to High)
                        </SelectItem>
                        <SelectItem value="averageGrowth_desc">
                            Average Growth (High to Low)
                        </SelectItem> */}
                            <SelectItem value="abv_asc">
                                ABV (Low to High)
                            </SelectItem>
                            <SelectItem value="abv_desc">
                                ABV (High to Low)
                            </SelectItem>
                            <SelectItem value="rla_asc">
                                RLA (Low to High)
                            </SelectItem>
                            <SelectItem value="rla_desc">
                                RLA (High to Low)
                            </SelectItem>
                            <SelectItem value="ola_asc">
                                OLA (Low to High)
                            </SelectItem>
                            <SelectItem value="ola_desc">
                                OLA (High to Low)
                            </SelectItem>
                            <SelectItem value="popularity_asc">
                                Popularity (Low to High)
                            </SelectItem>
                            <SelectItem value="popularity_desc">
                                Popularity (High to Low)
                            </SelectItem>
                            <SelectItem value="lowestAsk_asc">
                                Lowest Ask (Low to High)
                            </SelectItem>
                            <SelectItem value="lowestAsk_desc">
                                Lowest Ask (High to Low)
                            </SelectItem>
                            <SelectItem value="highestBid_asc">
                                Highest Bid (Low to High)
                            </SelectItem>
                            <SelectItem value="highestBid_desc">
                                Highest Bid (High to Low)
                            </SelectItem>
                            <SelectItem value="vintageYear_asc">
                                Vintage Year (Oldest First)
                            </SelectItem>
                            <SelectItem value="vintageYear_desc">
                                Vintage Year (Newest First)
                            </SelectItem>
                            <SelectItem value="estimatedBottleCount_asc">
                                Bottle Count (Low to High)
                            </SelectItem>
                            <SelectItem value="estimatedBottleCount_desc">
                                Bottle Count (High to Low)
                            </SelectItem>
                            <SelectItem value="currentValuation_asc">
                                Current Value (Low to High)
                            </SelectItem>
                            <SelectItem value="currentValuation_desc">
                                Current Value (High to Low)
                            </SelectItem>
                            <SelectItem value="createdAt_asc">
                                Created Date (Oldest First)
                            </SelectItem>
                            <SelectItem value="createdAt_desc">
                                Created Date (Newest First)
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
