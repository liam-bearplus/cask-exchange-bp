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
import { filterCaskValDefault } from "@/lib/constants";
import { ControllerRenderProps, Path } from "react-hook-form";

// Define the generic type for options
type FilterOptions<T> = T extends "checkbox"
    ? { label: string; value: string; checked: boolean }[]
    : number[];

// Main input filter type
type TInputFilter<T extends "checkbox" | "range" = "checkbox" | "range"> = {
    type: T;
    title: string;
    field: ControllerRenderProps<
        typeof filterCaskValDefault,
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
                                            // Remove empty expression to fix linting error
                                            field.onChange(
                                                Array.isArray(field.value)
                                                    ? [
                                                          ...field.value,
                                                          item.value,
                                                      ]
                                                    : [item.value]
                                            );
                                        } else {
                                            if (Array.isArray(field.value)) {
                                                const indexOf =
                                                    field.value.findIndex(
                                                        (val) =>
                                                            val === item.value
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
                                    placeholder={`${options?.[0]}`}
                                    value={
                                        Array.isArray(field.value)
                                            ? field.value?.[0]
                                            : undefined
                                    }
                                    onChange={(e) => {
                                        field.onChange([
                                            parseInt(e.target.value),
                                            Array.isArray(field.value)
                                                ? field.value[1]
                                                : undefined,
                                        ]);
                                    }}
                                />
                            </Button>
                            <Button size={"sm"} variant="input">
                                <Input
                                    type="number"
                                    placeholder={`${options?.[1]}`}
                                    value={
                                        Array.isArray(field.value)
                                            ? field.value?.[1]
                                            : undefined
                                    }
                                    onChange={(e) => {
                                        field.onChange([
                                            Array.isArray(field.value)
                                                ? field.value[0]
                                                : undefined,
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
        </div>
    );
};
