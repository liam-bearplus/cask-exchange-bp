import InputFilter from "@/components/shared/input-filter";
import { Accordion } from "@/components/ui/accordion";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { handleConvertOriginal, handleConvertReverse } from "@/helpers";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams.ts";
import {
    DATA_FILTER_CASKS,
    filterCaskValDefault,
    TOptionCheckBox,
} from "@/lib/constants";
import {
    KEY_FILTER_CASK_RANGE,
    KEY_FILTER_CASK_TYPE,
    KEY_FILTER_DISTILLERIES,
} from "@/lib/constants/key";
import { PARAMS } from "@/lib/constants/route";
import { convertStringToLabel } from "@/lib/utils";
import { filterSchema } from "@/lib/validators";
import caskServices from "@/services/cask";
import distilleriesServices from "@/services/distilleries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SideBarFooter from "../sidebar/footer";
import { useBoundStore } from "@/store";
export default function FormFilter() {
    const { updateParams, valueParams } = useUpdateSearchParams(PARAMS.filter);
    const {
        updateFilterCask,
        setIsCancel,
        isCancel,
        filterCask,
        updateCaskTypes,
        updateDistilleries,
    } = useBoundStore();
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

    const dataReverts = handleConvertReverse(valueParams ?? "");

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
        updateFilterCask(data);
        setIsCancel(false);
        updateParams(params);
    };

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
        updateFilterCask(form.getValues());
    }, [valueParams]);

    useEffect(() => {
        //set data to match label with tags
        if (!caskTypeQuery.data || !distilleryQuery.data) return;
        updateCaskTypes(caskTypeQuery.data);
        updateDistilleries(distilleryQuery.data);
        updateFilterCask(form.getValues());
    }, [caskTypeQuery.data, distilleryQuery.data]);

    useEffect(() => {
        if (isCancel) {
            form.reset(filterCask);
            setIsCancel(false);
        }
    }, [isCancel]);
    return (
        <div className="relative col-span-4 h-[calc(100vh-4.5rem)]">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="h-full min-h-full"
                >
                    <Accordion
                        type="multiple"
                        defaultValue={["caskType", "distillery"]}
                    >
                        <div className="mb-18 relative flex h-full flex-col">
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
                                                    isHaveSearch={
                                                        field.name ===
                                                        "distillery"
                                                    }
                                                />
                                            </FormControl>
                                        );
                                    }}
                                />
                            ))}
                        </div>
                    </Accordion>
                    <SideBarFooter className="sticky bottom-0 mt-auto" />
                </form>
            </Form>
        </div>
    );
}
