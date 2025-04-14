import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LabelSimple } from "@/components/ui/label";
import {
    filterCaskValDefault,
    TOptionCheckBox,
    TOptionRange,
} from "@/lib/constants";
import { filterSchema } from "@/lib/validators";
import { useEffect, useMemo, useState } from "react";
import { ControllerRenderProps, Path } from "react-hook-form";
import { z } from "zod";

// Define the generic type for options
type FilterOptions<T> = T extends "checkbox" ? TOptionCheckBox[] : TOptionRange;

// Main input filter type
type TInputFilter<T extends "checkbox" | "range" = "checkbox" | "range"> = {
    type: T;
    title: string;
    field: ControllerRenderProps<
        z.infer<typeof filterSchema>,
        Path<typeof filterCaskValDefault>
    >;
    options: FilterOptions<T>;
};

// InputFilter component with proper typing
export default function InputFilter<T extends "checkbox" | "range">({
    type,
    title,
    field,
    options,
}: TInputFilter<T>) {
    return type === "checkbox" ? (
        <InputCheckBox
            options={options as FilterOptions<"checkbox">}
            title={title}
            type={type}
            field={field}
        />
    ) : (
        <InputRange
            type={type}
            options={options as FilterOptions<"range">}
            title={title}
            field={field}
        />
    );
}

// InputCheckBox component with specific typing
const InputCheckBox = ({ options, title, field }: TInputFilter<"checkbox">) => {
    // State to track accordion open/close status
    const [accordionValue, setAccordionValue] = useState<string>("");

    // Check if any option is selected in the field value
    const hasSelectedValues = useMemo(() => {
        if (!Array.isArray(field.value)) return false;
        return field.value.length > 0;
    }, [field.value]);

    // Update accordion state based on selected values
    useEffect(() => {
        setAccordionValue(hasSelectedValues ? field.name : "");
    }, [hasSelectedValues, field.name]);
    return (
        <div>
            <Accordion
                type="single"
                collapsible
                value={accordionValue}
                onValueChange={() => {
                    setAccordionValue(
                        accordionValue === field.name ? "" : field.name
                    );
                }}
            >
                <AccordionItem value={field.name}>
                    <AccordionTrigger>
                        <h3 className="text-xl font-medium text-typo-primary">
                            {title}
                        </h3>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4">
                        <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                            <CommandInput placeholder={"asdad"} />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup heading="Suggestions">
                                    {options.map((item) => (
                                        <CommandItem key={item.label}>
                                            <div className="flex flex-row items-center gap-2">
                                                <Checkbox
                                                    id={item.id}
                                                    value={item.id}
                                                    checked={
                                                        Array.isArray(
                                                            field.value
                                                        ) &&
                                                        field.value.includes(
                                                            item.id as never
                                                        )
                                                    }
                                                    onCheckedChange={(
                                                        checked
                                                    ) => {
                                                        if (checked) {
                                                            // Remove empty expression to fix linting error
                                                            const isAll =
                                                                item.id ===
                                                                "all";
                                                            if (isAll) {
                                                                field.onChange([
                                                                    item.id,
                                                                ]);
                                                                return;
                                                            }

                                                            field.onChange(
                                                                Array.isArray(
                                                                    field.value
                                                                )
                                                                    ? [
                                                                          ...field.value.filter(
                                                                              (
                                                                                  val
                                                                              ) =>
                                                                                  val !==
                                                                                  "all"
                                                                          ),
                                                                          item.id,
                                                                      ]
                                                                    : [item.id]
                                                            );
                                                        } else {
                                                            if (
                                                                Array.isArray(
                                                                    field.value
                                                                )
                                                            ) {
                                                                const indexOf =
                                                                    field.value.findIndex(
                                                                        (val) =>
                                                                            val ===
                                                                            item.id
                                                                    );
                                                                if (
                                                                    indexOf > -1
                                                                ) {
                                                                    field.onChange(
                                                                        [
                                                                            ...field.value.slice(
                                                                                0,
                                                                                indexOf
                                                                            ),
                                                                            ...field.value.slice(
                                                                                indexOf +
                                                                                    1
                                                                            ),
                                                                        ]
                                                                    );
                                                                }
                                                            } else {
                                                            }
                                                        }
                                                    }}
                                                    className="h-6 w-6 flex-shrink-0"
                                                />
                                                <LabelSimple
                                                    htmlFor={item.label}
                                                >
                                                    {item.label
                                                        .split("-")
                                                        .join(" ")
                                                        .toLocaleUpperCase()}
                                                </LabelSimple>
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

// InputRange component with specific typing
const InputRange = ({ options, title, field }: TInputFilter<"range">) => {
    const [accordionValue, setAccordionValue] = useState<string>("");

    // Check if any value in the range is selected
    const hasSelectedValues = useMemo(() => {
        if (!Array.isArray(field.value)) return false;
        return field.value.some(
            (val) => val !== options[0] && val !== options[1]
        );
    }, [field.value, options]);

    // Update accordion state based on selected values
    useEffect(() => {
        setAccordionValue(hasSelectedValues ? field.name : "");
    }, [hasSelectedValues, field.name]);
    return (
        <div className="flex flex-col gap-4">
            <Accordion
                type="single"
                collapsible
                value={accordionValue}
                onValueChange={() => {
                    setAccordionValue(
                        accordionValue === field.name ? "" : field.name
                    );
                }}
            >
                <AccordionItem value={field.name}>
                    <AccordionTrigger>
                        <h3 className="text-xl font-medium text-typo-primary">
                            {title}
                        </h3>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4">
                        <div className="flex flex-row gap-4">
                            <Button size={"sm"} variant="input">
                                <Input
                                    type="number"
                                    isHideError
                                    placeholder={`${options?.[0]}`}
                                    value={
                                        Array.isArray(field.value)
                                            ? field.value?.[0]
                                            : options?.[0]
                                    }
                                    onChange={(e) => {
                                        field.onChange([
                                            parseInt(e.target.value),
                                            Array.isArray(field.value)
                                                ? field.value[1]
                                                : options?.[1],
                                        ]);
                                    }}
                                />
                            </Button>
                            <Button size={"sm"} variant="input">
                                <Input
                                    type="number"
                                    placeholder={`${options?.[1]}`}
                                    isHideError
                                    value={
                                        Array.isArray(field.value)
                                            ? field.value?.[1]
                                            : options?.[1]
                                    }
                                    onChange={(e) => {
                                        field.onChange([
                                            Array.isArray(field.value)
                                                ? field.value[0]
                                                : options?.[0],
                                            parseInt(e.target.value),
                                        ]);
                                    }}
                                />
                            </Button>
                        </div>
                        <Button type="submit" variant={"secondary"}>
                            Apply
                        </Button>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <FormMessage />
        </div>
    );
};
