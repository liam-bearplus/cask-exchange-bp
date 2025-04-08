import InputFilter from "@/components/shared/input-filter";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams.ts";
import {
    DATA_FILTER_CASKS,
    filterCaskValDefault,
    TOptionCheckBox,
} from "@/lib/constants";
import { MAP_KEY_FILTER_CASK } from "@/lib/constants/index";
import {
    KEY_FILTER_CASK_RANGE,
    KEY_FILTER_CASK_TYPE,
    KEY_FILTER_DISTILLERIES,
} from "@/lib/constants/key";
import { PARAMS } from "@/lib/constants/route";
import { convertStringToLabel, isEmpty } from "@/lib/utils";
import { filterSchema } from "@/lib/validators";
import caskServices from "@/services/cask";
import distilleriesServices from "@/services/distilleries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
export default function FormFilter() {
    const { updateParams, valueParams } = useUpdateSearchParams(PARAMS.filter);
    const [dataFilter, setDataFilter] =
        useState<typeof DATA_FILTER_CASKS>(DATA_FILTER_CASKS);

    const caskTypeQuery = useQuery({
        queryKey: [KEY_FILTER_CASK_TYPE],
        queryFn: caskServices.getCaskTypes,
    });
    const distilleryQuery = useQuery({
        queryKey: [KEY_FILTER_DISTILLERIES],
        queryFn: distilleriesServices.getDistillery,
    });
    const caskRangeQuery = useQuery({
        queryKey: [KEY_FILTER_CASK_RANGE],
        queryFn: caskServices.getCaskRange,
    });

    const form = useForm<z.infer<typeof filterSchema>>({
        resolver: zodResolver(filterSchema),
        defaultValues: filterCaskValDefault,
        // mode: "onSubmit",
    });

    const handleConvertOriginal = (data: z.infer<typeof filterSchema>) => {
        const result = Object.entries(data).reduce(
            (acc: { [key: string]: string }, [key, value]) => {
                const keySearch =
                    MAP_KEY_FILTER_CASK[
                        key as keyof typeof MAP_KEY_FILTER_CASK
                    ];
                // Early return if value is empty or contains "all"
                if (
                    isEmpty(value) ||
                    (Array.isArray(value) && value.includes("all" as never))
                ) {
                    return acc; // Return accumulated result without processing this value
                }

                // replace key to key search, ex: caskType => casktypeId, destillery => distilleryId
                if (typeof keySearch === "string") {
                    if (!acc[keySearch]) {
                        acc[keySearch] = Array.isArray(value)
                            ? value.join(",")
                            : (value as string);
                    } else {
                        acc[keySearch] += `,${value}`;
                    }
                } else {
                    Object.values(keySearch).forEach((val, index) => {
                        if (!acc[val]) {
                            acc[val] = `${value[index]}`;
                        }
                    });
                }

                return acc;
            },
            {}
        );
        const dataParams = Object.entries(result)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");
        return dataParams;
    };

    // Reverse function to convert filter string back to object
    const handleConvertReverse = useCallback(
        (filterString: string): z.infer<typeof filterSchema> => {
            if (!filterString) return filterCaskValDefault;

            const filterStringArr = filterString.split("&");

            const filterStringObj = filterStringArr.reduce(
                (acc: { [key: string]: string }, val) => {
                    const [key, value] = val.split("=");
                    acc[key] = value;
                    return acc;
                },
                {}
            );

            //Update key real,
            const mapFormKey = Object.entries(MAP_KEY_FILTER_CASK).reduce(
                (
                    acc: { [key: string]: Array<number | string | never> },
                    [key, value]
                ) => {
                    if (typeof value === "string") {
                        const findValue = Object.entries(filterStringObj).find(
                            ([keyFind]) => value === keyFind
                        );
                        acc[key] = findValue ? findValue[1].split(",") : [];
                    } else {
                        if (
                            isEmpty(filterStringObj[value.min]) ||
                            isEmpty(filterStringObj[value.max])
                        )
                            return acc;
                        acc[key] = [
                            Number(filterStringObj[value.min]),
                            Number(filterStringObj[value.max]),
                        ];
                    }
                    return acc;
                },
                {}
            );
            return mapFormKey;
        },
        []
    );

    const dataReverts = handleConvertReverse(valueParams ?? "");

    useEffect(() => {
        if (dataReverts?.rla) form.setValue("rla", dataReverts.rla);
        if (dataReverts?.ola) form.setValue("ola", dataReverts.ola);
        if (dataReverts?.distillery)
            form.setValue("distillery", dataReverts.distillery);
        if (dataReverts?.caskType)
            form.setValue("caskType", dataReverts.caskType);
        if (dataReverts?.year) form.setValue("year", dataReverts.year);
        if (dataReverts?.abv) form.setValue("abv", dataReverts.abv);
        if (dataReverts?.bottles) form.setValue("bottles", dataReverts.bottles);
        if (dataReverts?.price) form.setValue("price", dataReverts.price);
    }, [valueParams]);

    useEffect(() => {
        if (caskTypeQuery.data && distilleryQuery.data && caskRangeQuery.data) {
            // Create a deep copy of DATA_FILTER_CASKS to avoid mutating the original
            const updatedDataFilter = JSON.parse(
                JSON.stringify(DATA_FILTER_CASKS)
            );

            // Update cask type options
            updatedDataFilter.caskType = {
                ...updatedDataFilter.caskType,
                options: [
                    ...updatedDataFilter.caskType.options,
                    ...caskTypeQuery.data.map((val) => ({
                        label: val?.name || "",
                        value: convertStringToLabel(val.name || ""),
                        checked: false,
                        id: val.id,
                    })),
                ] as TOptionCheckBox[],
            };

            // Update distillery options
            updatedDataFilter.distillery = {
                ...updatedDataFilter.distillery,
                options: [
                    ...updatedDataFilter.distillery.options,
                    ...distilleryQuery.data.map((val) => ({
                        label: val?.name || "",
                        value: convertStringToLabel(val.name || ""),
                        id: val.id,
                    })),
                ] as TOptionCheckBox[],
            };

            // Update range options
            const ranges = {
                rla: caskRangeQuery.data.rla,
                ola: caskRangeQuery.data.ola,
                year: caskRangeQuery.data.vintageYear,
                abv: caskRangeQuery.data.abv,
                bottles: caskRangeQuery.data.estimatedBottleCount,
                price: caskRangeQuery.data.price,
            };

            Object.entries(ranges).forEach(([key, range]) => {
                updatedDataFilter[key].options = [
                    Math.floor(range?.min as number) || 0,
                    Math.floor(range?.max as number) || 0,
                ];
            });

            // Update state with the new filter data
            setDataFilter(updatedDataFilter);
        }
    }, [caskTypeQuery.data, distilleryQuery.data, caskRangeQuery.data]);
    //set value first with params search

    const handleSubmit = (data: z.infer<typeof filterSchema>) => {
        const params = handleConvertOriginal(data);
        updateParams(params);
    };

    return (
        <div className="relative col-span-4">
            <div className="sticky top-[10vh] h-[80vh] overflow-scroll pr-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className="flex flex-col gap-4">
                            {Object.entries(dataFilter).map(([key, value]) => (
                                <FormField
                                    key={key}
                                    name={
                                        key as keyof z.infer<
                                            typeof filterSchema
                                        >
                                    }
                                    control={form.control}
                                    render={({ field }) => {
                                        return (
                                            <FormControl>
                                                <InputFilter
                                                    key={value.title}
                                                    {...value}
                                                    field={field}
                                                />
                                            </FormControl>
                                        );
                                    }}
                                />
                            ))}
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
