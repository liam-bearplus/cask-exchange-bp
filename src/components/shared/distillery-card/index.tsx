import { TDistillery } from "@/types";
import React from "react";
import ImagePlaceholder from "../image-placeholder";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type TProps = {
    className?: string;
    data: TDistillery;
    index?: number;
};
const IMG_DISTILLERY = [
    "/images/distillery/distillery-1.jpg",
    "/images/distillery/distillery-2.jpg",
    "/images/distillery/distillery-3.jpg",
    "/images/distillery/distillery-4.jpg",
    "/images/distillery/distillery-5.jpg",
    "/images/distillery/distillery-6.jpg",
    "/images/distillery/distillery-7.jpg",
    "/images/distillery/distillery-8.jpg",
];
export default function DistilleryCard(props: TProps) {
    const { data, className, index } = props;
    const imgCurrent = IMG_DISTILLERY[index || 0] || IMG_DISTILLERY[0];
    return (
        <div
            className={cn(
                "flex min-w-[9.375rem] flex-shrink-0 flex-col items-center gap-3",
                className
            )}
        >
            <div className="aspect-square w-full overflow-hidden rounded-lg">
                <ImagePlaceholder
                    src={imgCurrent}
                    width={300}
                    height={300}
                    className="rounded-lg"
                />
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="text-base font-medium text-typo-primary">
                    {data.name}
                </div>
                <div className="text-typo-secondary text-sm">1000 casks</div>
            </div>
        </div>
    );
}

export function DistilleryCardSkeleton() {
    return (
        <div className="flex flex-1 flex-col items-center">
            <Skeleton className="mb-3 aspect-square w-[9.375rem]" />
            <Skeleton className="mb-1 h-2 w-full" />
            <Skeleton className="h-2 w-2/3" />
        </div>
    );
}
