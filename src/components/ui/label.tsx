"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { useFormField } from "./form";

const labelVariants = cva(
    "text-sm font-medium text-typo-body inline-block after:content-['*'] after:ml-0.5 after:text-brand after:hidden has-[+_div_input:required]:after:inline-block peer-disabled:cursor-not-allowed"
);

const Label = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
        VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => {
    const { error } = useFormField();

    return (
        <LabelPrimitive.Root
            ref={ref}
            className={cn(
                labelVariants(),
                error && "after:text-error",
                className
            )}
            {...props}
        />
    );
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
