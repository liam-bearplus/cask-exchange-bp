import { cn } from "@/lib/utils";
import { EyeIcon, EyeOff } from "lucide-react";
import * as React from "react";
import { useFormField } from "./form";

interface InputProps extends React.ComponentProps<"input"> {
    variant?: "password" | "default";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, variant, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false);
        const { error } = useFormField();

        const togglePasswordVisibility = () => {
            setShowPassword((prev) => !prev);
        };

        return (
            <div className="flex-start relative">
                <input
                    type={
                        variant === "password" && showPassword ? "text" : type
                    }
                    className={cn(
                        "peer col-span-2 flex h-10 w-full rounded-lg bg-background px-3 py-2 text-base text-typo-primary shadow-sm outline-none ring-1 ring-inset ring-input ring-offset-input transition-all placeholder:text-typo-disable hover:ring-bd-sf2 focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:bg-bg-disable",
                        error &&
                            "border-error ring-error hover:ring-error-darker focus-visible:ring-error",
                        className
                    )}
                    ref={ref}
                    {...props}
                />

                {variant === "password" && (
                    <button
                        type="button"
                        className="absolute right-1 p-2 text-typo-disable transition-colors hover:text-typo-body"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? (
                            <EyeIcon
                                className={cn("h-4 w-4", error && "text-error")}
                            />
                        ) : (
                            <EyeOff
                                className={cn("h-4 w-4", error && "text-error")}
                            />
                        )}
                    </button>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
