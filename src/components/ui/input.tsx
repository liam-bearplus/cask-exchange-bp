import * as React from "react"
import { EyeIcon, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  variant?: "password" | "default";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="relative flex-start">
        <input
          type={variant === "password" && showPassword ? "text" : type}
          className={cn(
            "flex h-10 w-full rounded-lg outline-none ring-inset ring-input ring-1 ring-offset-input bg-background px-3 py-2 col-span-2 shadow-sm text-base text-typo-primary hover:ring-bd-sf2 placeholder:text-typo-disable transition-all focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:bg-bg-disable peer",
            className
          )}
          ref={ref}
          {...props}
        />
        {variant === "password" && (
          <button
            type="button"
            className="absolute text-typo-disable transition-colors right-1 p-2 hover:text-typo-body"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeIcon className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input"

export { Input }
