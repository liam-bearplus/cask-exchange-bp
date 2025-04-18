import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { LabelSimple } from "@/components/ui/label";
import {
    filterCaskValDefault,
    TOptionCheckBox,
    TOptionRange,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { filterSchema } from "@/lib/validators";
import { useCallback } from "react";
import { ControllerRenderProps, Path } from "react-hook-form";
import { z } from "zod";
import ImagePlaceholder from "../image-placeholder";

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
    isHaveSearch?: boolean;
    options: FilterOptions<T>;
    unit?: string;
};

// InputFilter component with proper typing
export default function InputFilter<T extends "checkbox" | "range">(
    props: TInputFilter<T>
) {
    const { type, options, ...params } = props;
    return type === "checkbox" ? (
        <InputCheckBox
            options={options as FilterOptions<"checkbox">}
            type="checkbox"
            {...params}
        />
    ) : (
        <InputRange
            options={options as FilterOptions<"range">}
            type={"range"}
            {...params}
        />
    );
}

// InputCheckBox component with specific typing
const InputCheckBox = ({
    options,
    title,
    field,
    isHaveSearch,
}: TInputFilter<"checkbox">) => {
    const handleCheckboxChange = useCallback(
        (checked: boolean, itemId: string) => {
            if (!Array.isArray(field.value)) return;

            if (checked) {
                const isAll = itemId === "all";
                if (isAll) {
                    field.onChange([itemId]);
                    return;
                }

                field.onChange([
                    ...field.value.filter((val) => val !== "all"),
                    itemId,
                ]);
            } else {
                field.onChange(field.value.filter((val) => val !== itemId));
            }
        },
        [field]
    );

    const handleRenderGroupCheckBox = () => {
        const CheckboxWrap = isHaveSearch ? CommandItem : "div";
        return (
            <div className="flex w-full flex-col gap-3">
                {options.map((item) => (
                    <CheckboxWrap
                        key={item.label}
                        className={cn(
                            "cursor-pointer py-0 data-[selected='true']:bg-transparent"
                        )}
                    >
                        <div className="flex w-full cursor-pointer flex-row items-center gap-2 text-typo-body hover:[&_label]:font-semibold hover:[&_label]:text-typo-primary">
                            <Checkbox
                                id={item.id}
                                value={item.id}
                                checked={
                                    Array.isArray(field.value) &&
                                    field.value.includes(item.id as never)
                                }
                                onCheckedChange={(checked) =>
                                    handleCheckboxChange(
                                        checked as boolean,
                                        item.id || ""
                                    )
                                }
                                className="h-6 w-6 flex-shrink-0"
                            />
                            <LabelSimple
                                htmlFor={item.id}
                                className={cn("flex-1 cursor-pointer")}
                            >
                                {item.label.split("-").join(" ")}
                            </LabelSimple>
                        </div>
                    </CheckboxWrap>
                ))}
            </div>
        );
    };
    const handleRenderGroupCheckBoxWithSearch = () => {
        return (
            <Command className="w-full">
                <CommandInput
                    placeholder={`Search for a ${title.toLowerCase()}`}
                />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>{handleRenderGroupCheckBox()}</CommandGroup>
                </CommandList>
            </Command>
        );
    };

    return (
        <div>
            <AccordionItem value={field.name}>
                <AccordionTrigger className="[&[data-state=open]]:pb-4">
                    <h3 className="text-xl font-medium text-typo-primary">
                        {title}
                    </h3>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4">
                    {isHaveSearch
                        ? handleRenderGroupCheckBoxWithSearch()
                        : handleRenderGroupCheckBox()}
                </AccordionContent>
            </AccordionItem>
        </div>
    );
};

// InputRange component with specific typing
const InputRange = ({ options, title, field, unit }: TInputFilter<"range">) => {
    // Check if any value in the range is selected

    const handleSwapValue = useCallback(() => {
        if (!Array.isArray(field.value)) return;

        const [min, max] = field.value.map(Number);
        const [defaultMin, defaultMax] = options;

        if (!min || !max) {
            const minV = !isNaN(min)
                ? min < defaultMin || min > defaultMax
                    ? defaultMin
                    : min
                : undefined;

            const maxV = !isNaN(max)
                ? max < defaultMin || max > defaultMax
                    ? defaultMax
                    : max
                : undefined;

            field.onChange([minV, maxV]);
            return;
        }

        const valMin = Math.max(min, defaultMin); //|| defaultMin;
        const valMax = Math.min(max, defaultMax); //|| defaultMax;

        if (max < min) {
            field.onChange([
                max > defaultMin && max < defaultMax ? max : defaultMin,
                min > defaultMin && min < defaultMax ? min : defaultMax,
            ]);
            return;
        }

        field.onChange([valMin, valMax]);
    }, [field.value, options]);

    return (
        <div className="flex flex-col gap-4">
            <AccordionItem value={field.name}>
                <AccordionTrigger className="[&[data-state=open]]:pb-4">
                    <h3 className="text-xl font-medium text-typo-primary">
                        {title}
                    </h3>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col">
                    <div className="flex flex-row items-center gap-4">
                        <div className="relative">
                            {unit && (
                                <div className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-typo-sub">
                                    {unit}
                                </div>
                            )}
                            <Input
                                type="number"
                                isHideError
                                placeholder={`From`}
                                maxLength={13}
                                onBlur={handleSwapValue}
                                className={cn(`${unit && "pl-8"}`)}
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
                        </div>

                        <ImagePlaceholder
                            width={32}
                            height={32}
                            alt="Minus icon"
                            className="h-4 w-4"
                            imgClassName="img-fill"
                            src={"/icons/minus-icon.svg"}
                        />
                        <div className="relative">
                            {unit && (
                                <div className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-typo-sub">
                                    {unit}
                                </div>
                            )}
                            <Input
                                type="number"
                                placeholder={`To`}
                                isHideError
                                maxLength={13}
                                className={cn(`${unit && "pl-8"}`)}
                                onBlur={handleSwapValue}
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
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </div>
    );
};
