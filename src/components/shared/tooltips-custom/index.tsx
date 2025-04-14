import { cn } from "@/lib/utils";
import React, { useState } from "react";

export default function CustomTooltip({
    children,
    className,
    content,
}: {
    children: React.ReactNode;
    content: string;
    className?: string;
}) {
    return (
        <div className="group relative inline-block">
            <div className="relative">{children}</div>
            <div
                className={cn(
                    "absolute bottom-full left-1/2 z-50 w-max origin-[--radix-tooltip-content-transform-origin] -translate-x-1/2 translate-y-1 rounded-md bg-bg-dark-main px-3 py-2 text-xs text-typo-dark-primary opacity-0 shadow-md transition-all animate-in animate-out fade-in-0 slide-in-from-bottom-2 group-hover:translate-y-0 group-hover:opacity-100",
                    className
                )}
            >
                <div className="absolute left-1/2 top-full w-4 -translate-x-1/2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        viewBox="0 0 16 10"
                        fill="none"
                    >
                        <path
                            d="M14.0711 -2.232C14.962 -2.232 15.4081 -1.15485 14.7782 -0.524888L8.70711 5.54619C8.31658 5.93671 7.68342 5.93671 7.29289 5.54619L1.22183 -0.524888C0.591867 -1.15485 1.03803 -2.232 1.92894 -2.232L14.0711 -2.232Z"
                            className="fill-bg-dark-main"
                        />
                    </svg>
                </div>
                <p className="text-xs text-typo-dark-primary">{content}</p>
            </div>
        </div>
    );
}
