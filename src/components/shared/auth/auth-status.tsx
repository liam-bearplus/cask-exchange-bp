import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import ImagePlaceholder from "../image-placeholder";
import IconLoading from "../icons/icon-loading";

type TAuthStatus = {
    status: "success" | "error" | "pending" | "resend" | "idle";
    title?: string;
    buttonText?: string;
    action?: () => void;
    isDisableButton?: boolean;
    messageError?: string;
} & PropsWithChildren;

export default function AuthStatus({ status, ...data }: TAuthStatus) {
    const imageWithStatus = {
        success: (
            <ImagePlaceholder
                alt="Signup success"
                src="/icons/signup-success.svg"
                width={80}
                height={80}
            />
        ),
        error: (
            <ImagePlaceholder
                alt="Signup error"
                src="/icons/signup-error.svg"
                width={80}
                height={80}
            />
        ),
        pending: <IconLoading />,
        idle: "",
        resend: (
            <ImagePlaceholder
                alt="Signup resend"
                src="/icons/sign-up-email.svg"
                width={80}
                height={80}
            />
        ),
    };
    return (
        <div className="flex-center flex-col space-y-8">
            <div className={cn("h-20 w-20")}>
                {imageWithStatus[status] && imageWithStatus[status]}
            </div>
            <div className="text-center">
                <div className="mb-2 text-2xl font-semibold text-typo-primary">
                    {data.title}
                </div>
                <div className="text-base text-typo-body">{data.children}</div>
            </div>

            <Button
                variant="secondary"
                className="w-full"
                disabled={data.isDisableButton}
                onClick={() => data.action?.()}
            >
                {data.buttonText}
            </Button>
            {data.messageError && (
                <p
                    className={
                        "!mt-[0.375rem] text-sm font-medium text-destructive first-letter:capitalize"
                    }
                >
                    {data.messageError}
                </p>
            )}
        </div>
    );
}
