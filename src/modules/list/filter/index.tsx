import InputFilter from "@/components/shared/input-filter";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { DATA_FILTER_CASKS, filterCaskValDefault } from "@/lib/constants";
import { isEmpty } from "@/lib/utils";
import { filterSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MAP_KEY_FILTER_CASK } from "../../../lib/constants/index";

export default function FormFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const filterData = searchParams.get("filter");
    const form = useForm<z.infer<typeof filterSchema>>({
        resolver: zodResolver(filterSchema),
        defaultValues: filterCaskValDefault,
    });

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [searchParams]
    );

    const handleConvertOriginal = (data: z.infer<typeof filterSchema>) => {
        const result = Object.entries(data).reduce((acc, [key, value]) => {
            if (isEmpty(value)) {
                return acc;
            }
            return {
                ...acc,
                [MAP_KEY_FILTER_CASK[key as keyof typeof MAP_KEY_FILTER_CASK]]:
                    value,
            };
        });

        const dataParams = JSON.stringify(result);
        return dataParams;
    };

    // Reverse function to convert filter string back to object
    const handleConvertReverse = (
        filterString: string
    ): z.infer<typeof filterSchema> => {
        if (!filterString) return filterCaskValDefault;
        const parsedData = JSON.parse(filterString);

        const result = Object.entries(parsedData).reduce(
            (acc, [key, value]) => {
                // Find the original key by searching through MAP_KEY_FILTER_CASK
                const originalKey = Object.entries(MAP_KEY_FILTER_CASK).find(
                    //eslint-disable-next-line @typescript-eslint/no-unused-vars
                    ([_, mappedKey]) => mappedKey === key
                )?.[0];
                if (!originalKey) return acc;
                if (
                    originalKey === "caskType" ||
                    originalKey === "distillery"
                ) {
                    const valueMapping = Array.isArray(value)
                        ? value.map((val) => ({
                              label: val,
                              value: val,
                          }))
                        : [];
                    return {
                        ...acc,
                        [originalKey]: valueMapping,
                    };
                }
                return {
                    ...acc,
                    [originalKey]: value,
                };
            },
            {}
        );

        return result as z.infer<typeof filterSchema>;
    };
    const dataReverts = handleConvertReverse(filterData ?? "");
    useEffect(() => {
        if (dataReverts?.rla) form.setValue("rla", dataReverts.rla);
        if (dataReverts?.ola) form.setValue("ola", dataReverts.ola);
        if (dataReverts?.distillery)
            form.setValue("distillery", dataReverts.distillery);
        if (dataReverts?.caskType) {
            DATA_FILTER_CASKS["caskType"].options.forEach((val) => {
                if (typeof val !== "object") return;
                const indexOf = dataReverts.caskType.findIndex(
                    (val2) => val2 === val.value
                );
                if (indexOf > -1) {
                    val.checked = true;
                }
            });
            console.log(
                'DATA_FILTER_CASKS["caskType"].options',
                DATA_FILTER_CASKS["caskType"].options
            );
        }

        if (dataReverts?.year) form.setValue("year", dataReverts.year);
        if (dataReverts?.abv) form.setValue("abv", dataReverts.abv);
        if (dataReverts?.bottles) form.setValue("bottles", dataReverts.bottles);
    }, [dataReverts, DATA_FILTER_CASKS]);

    console.log("dataReverts", dataReverts);
    const handleSubmit = (data: z.infer<typeof filterSchema>) => {
        router.push(
            `${pathname}?${createQueryString("filter", handleConvertOriginal(data))}`
        );
    };
    return (
        <div className="relative col-span-4">
            <div className="sticky top-[10vh] h-[80vh] overflow-scroll pr-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className="flex flex-col gap-4">
                            {Object.entries(DATA_FILTER_CASKS).map(
                                ([key, value]) => (
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
                                )
                            )}
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
