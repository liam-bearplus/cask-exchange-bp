import InputFilter from "@/components/shared/input-filter";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { filterCaskValues } from "@/lib/constants";
import { isEmpty } from "@/lib/utils";
import { filterSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
export const DATA_FILTER: Array<
    | {
          title: string;
          name: string;
          type: "checkbox";
          options: { label: string; value: string }[];
      }
    | {
          title: string;
          type: "range";
          name: string;
          options: { from: number; to: number };
      }
> = [
    {
        title: "Distillery",
        name: "distillery",
        type: "checkbox",
        options: [
            { label: "All", value: "all" },
            { label: "Anberargie", value: "anberargie" },
            { label: "Aberflour", value: "aberflour" },
        ],
    },
    {
        title: "CaskType",
        name: "caskType",
        type: "checkbox",
        options: [
            {
                label: "All",
                value: "all",
            },
            {
                label: "Sherry Burn",
                value: "sherry-burn",
            },
            {
                label: "Hogshead",
                value: "hogshead",
            },
        ],
    },
    {
        title: "Year",
        type: "range",
        name: "year",
        options: {
            from: 1930,
            to: 2050,
        },
    },
    {
        title: "ABV",
        type: "range",
        name: "abv",
        options: {
            from: 0,
            to: 45,
        },
    },
    {
        title: "RLA",
        type: "range",
        name: "rla",
        options: {
            from: 0,
            to: 45,
        },
    },
    {
        title: "OLA",
        type: "range",
        name: "ola",
        options: {
            from: 0,
            to: 45,
        },
    },
    {
        title: "Bottles",
        type: "range",
        name: "bottles",
        options: {
            from: 0,
            to: 45,
        },
    },
];

export default function FormFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const filterData = searchParams.get("filter");
    const form = useForm<z.infer<typeof filterSchema>>({
        resolver: zodResolver(filterSchema),
        defaultValues: filterCaskValues,
    });

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );
    const convertToString = (
        value: string[] | { from: number; to: number }
    ) => {
        if (Array.isArray(value)) {
            return value.join("-");
        }
        return `${value.from}-${value.to}`;
    };
    const convertToType = (value: string) => {
        console.log("value", value);
        const [from, to] = value.split("&").map(Number);
        return { from, to };
    };
    console.log("filterData", convertToType(filterData));

    const handleSubmit = (data: z.infer<typeof filterSchema>) => {
        const params = Object.entries(data).reduce(
            (acc: string[], [key, value]): string[] => {
                if (value === undefined || isEmpty(value)) return acc;

                acc.push(`${key}=${convertToString(value)}`);
                return acc;
            },
            []
        );

        router.push(
            pathname + "?" + createQueryString("filter", params.join("&"))
        );
    };
    return (
        <div className="relative col-span-4">
            <div className="sticky top-[10vh] h-[80vh] overflow-scroll pr-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className="flex flex-col gap-4">
                            {DATA_FILTER.map((item, index) => (
                                <FormField
                                    key={index}
                                    name={
                                        item.name as keyof z.infer<
                                            typeof filterSchema
                                        >
                                    }
                                    control={form.control}
                                    render={({ field }) => {
                                        return (
                                            <FormControl>
                                                <InputFilter
                                                    key={item.title}
                                                    {...item}
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
