import { cn } from "@/lib/utils";
import React, { forwardRef, HTMLAttributes } from "react";
type TPropsHeading = {
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
} & HTMLAttributes<HTMLHeadingElement>;
const HeadingContent = forwardRef<HTMLHeadingElement, TPropsHeading>(
    (props, ref) => {
        const { className, tag = "h2", children, ...params } = props;
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
            </Tag>
        );
    }
);

export default HeadingContent;

HeadingContent.displayName = "HeadingContent";
