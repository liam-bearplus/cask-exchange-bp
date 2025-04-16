import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams.ts";
import { KEY_SORT_CASK } from "@/lib/constants/key";
import { PARAMS } from "@/lib/constants/route";
import caskServices from "@/services/cask";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

export function SortFilter() {
    const { updateParams, valueParamsUpdate } = useUpdateSearchParams(
        PARAMS.sortBy
    );
    const sortCaskData = useQuery({
        queryKey: [KEY_SORT_CASK],
        queryFn: caskServices.getSortedCasks,
    });
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
    const defaultParams = handleRevertParams(valueParamsUpdate);
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
        <div className="relative">
            <Select
                value={valueSelect}
                defaultValue={defaultParams}
                onValueChange={handleSplitParams}
            >
                <SelectTrigger className="w-full" subLabel="Sort by: ">
                    <SelectValue placeholder="Popular Cask" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {sortCaskData.data?.sortOptions.map((sort) => {
                            return (
                                <SelectItem
                                    value={`${sort.value}_${sort.defaultOrder.toLowerCase()}`}
                                    key={sort.name}
                                >
                                    {sort.name}
                                </SelectItem>
                            );
                        })}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
