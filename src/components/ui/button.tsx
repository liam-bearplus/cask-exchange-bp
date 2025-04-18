import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-x-1 whitespace-nowrap px-3 rounded-md text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-bg-disable disabled:text-typo-disable [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer disabled:cursor-not-allowed disabled-pointer-events-none",
    {
        variants: {
            variant: {
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-bd-main bg-transparent hover:border-brand hover:bg-brand  disabled:border-bg-disable ",
                secondary:
                    "bg-bg-dark-main text-typo-dark-primary hover:bg-brand hover:text-typo-primary active:bg-brand-darker",
                ghost: "disabled:bg-bg-disable disabled:text-typo-disable disabled:cursor-not-allowed bg-bg-sf2 text-typo-primary hover:bg-bg-dark-main hover:text-typo-dark-primary",
                link: "text-typo-primary min-w-unset flex flex-row gap-1 !p-0 flex-start rounded-none border-b hover:border-brand hover:text-brand border-current !min-w-fit",
                input: "outline-none ring-1 ring-inset ring-input ring-offset-input hover:ring-bd-sf2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
                icon: "rounded-full bg-bg-dark-sf1 text-typo-dark-primary bg-bg-dark-sf1 p-0",
                primary: "bg-brand text-typo-primary hover:bg-brand-darker",
                empty: "disabled:text-typo-disable disabled:cursor-not-allowed disabled:bg-transparent ",
                invisible: "text-typo-primary hover:bg-bg-sf1",
            },
            size: {
                default: "py-2.5 min-w-32",
                sm: "py-1.5 min-w-24",
                lg: "py-3.5 min-w-40 px-5",

                icon: "h-10 w-10",
            },
            mode: {
                dark: "",
                light: "",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
        compoundVariants: [
            {
                variant: "ghost",
                mode: "dark",
                className:
                    "text-typo-dark-primary hover:bg-bg-dark-sf1 bg-white-100/30 disable:text-white-100/50 disabled:bg-white-100/10 disabled:hover:bg-white-100/10",
            },
        ],
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    mode?: "dark" | "light";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className, variant, size, asChild = false, mode = "light", ...props },
        ref
    ) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(
                    buttonVariants({ variant, size, className, mode })
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
