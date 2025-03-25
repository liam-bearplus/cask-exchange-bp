import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { LabelSimple } from "@/components/ui/label";
import { filterCaskValues } from "@/lib/constants";
import { ControllerRenderProps, Path } from "react-hook-form";

// Define the generic type for options
type FilterOptions<T> = T extends "checkbox"
    ? { label: string; value: string }[]
    : { from: number; to: number };

// Main input filter type
type TInputFilter<T extends "checkbox" | "range" = "checkbox" | "range"> = {
    type: T;
    title: string;
    field: ControllerRenderProps<
        typeof filterCaskValues,
        Path<typeof filterCaskValues>
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
    return (
        <div>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <h3 className="text-xl font-medium text-typo-primary">
                            {title}
                        </h3>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4">
                        {options.map((item) => (
                            <div
                                key={item.label}
                                className="flex flex-row items-center gap-2"
                            >
                                <Checkbox
                                    id={item.label}
                                    value={item.value}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            Array.isArray(field.value)
                                                ? field.onChange([
                                                      ...field.value,
                                                      item.value,
                                                  ])
                                                : field.onChange([item.value]);
                                        } else {
                                            if (Array.isArray(field.value)) {
                                                const indexOf =
                                                    field.value.indexOf(
                                                        item.value as string
                                                    );
                                                if (indexOf > -1) {
                                                    field.onChange([
                                                        ...field.value.slice(
                                                            0,
                                                            indexOf
                                                        ),
                                                        ...field.value.slice(
                                                            indexOf + 1
                                                        ),
                                                    ]);
                                                }
                                            } else {
                                            }
                                        }
                                    }}
                                    className="h-6 w-6 flex-shrink-0"
                                />
                                <LabelSimple htmlFor={item.label}>
                                    {item.label
                                        .split("-")
                                        .join(" ")
                                        .toLocaleUpperCase()}
                                </LabelSimple>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

// InputRange component with specific typing
const InputRange = ({ options, title, field }: TInputFilter<"range">) => {
    return (
        <div className="flex flex-col gap-4">
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
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
                                    placeholder={`${options?.from}`}
                                    value={
                                        typeof field?.value === "object" &&
                                        "from" in field.value
                                            ? field.value.from
                                            : undefined
                                    }
                                    onChange={(e) => {
                                        field.onChange({
                                            ...(field.value as { to: number }),
                                            from: parseInt(e.target.value),
                                        });
                                    }}
                                />
                            </Button>
                            <Button size={"sm"} variant="input">
                                <Input
                                    type="number"
                                    placeholder={`${options.to}`}
                                    value={
                                        typeof field?.value === "object" &&
                                        "from" in field.value
                                            ? field.value.to
                                            : undefined
                                    }
                                    onChange={(e) => {
                                        field.onChange({
                                            ...(field.value as {
                                                from: number;
                                            }),
                                            to: parseInt(e.target.value),
                                        });
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
        </div>
    );
};
