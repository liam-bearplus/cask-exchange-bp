import { cn } from "@/lib/utils";
import React, { forwardRef, HTMLAttributes } from "react";
import IconHelp from "../icons/icon-help";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
type TPropsHeading = {
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
} & HTMLAttributes<HTMLHeadingElement> & {
        subTitle?: string;
    };
const HeadingContent = forwardRef<HTMLHeadingElement, TPropsHeading>(
    (props, ref) => {
        const { className, tag = "h2", children, subTitle, ...params } = props;
        const Tag = tag;
        return (
            <Tag
                ref={ref}
                className={cn(
                    "mb-12 max-w-[31.9375rem] text-3xl font-medium text-typo-primary",
                    className
                )}
                {...params}
            >
                {children}
                {subTitle && (
                    <TooltipProvider delayDuration={500}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant={"empty"}
                                    className="!min-w-max !p-1"
                                >
                                    <IconHelp />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{subTitle}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </Tag>
        );
    }
);

export default HeadingContent;

HeadingContent.displayName = "HeadingContent";

export const HeadingContentSkeleton = () => {
    return (
        <div className="flex w-40 flex-col gap-2">
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-2 w-2/3" />
        </div>
    );
};
