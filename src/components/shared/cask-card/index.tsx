import { cn, formatCurrency } from "@/lib/utils";
import { TCask } from "@/types";
import React from "react";
import ImagePlaceholder from "../image-placeholder";
import { Heart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type TCaskProps = {
    className?: string;
    data: TCask;
    isRevert: boolean;
    index: number;
};
const IMG_CASK = [
    "/images/cask/cask_1.jpg",
    "/images/cask/cask_2.jpg",
    "/images/cask/cask_3.jpg",
    "/images/cask/cask_4.jpg",
    "/images/cask/cask_5.jpg",
    "/images/cask/cask_6.jpg",
    "/images/cask/cask_7.jpg",
    "/images/cask/cask_8.jpg",
    "/images/cask/cask_9.jpg",
    "/images/cask/cask_10.jpg",
    "/images/cask/cask_11.jpg",
    "/images/cask/cask_12.jpg",
    "/images/cask/cask_13.jpg",
    "/images/cask/cask_14.jpg",
];
export default function CaskCard({
    className,
    data,
    index,
    isRevert,
}: TCaskProps) {
    const img_cask = isRevert
        ? IMG_CASK[index % IMG_CASK.length]
        : IMG_CASK[(IMG_CASK.length - index) % IMG_CASK.length];
    return (
        <div
            className={cn(
                "group relative w-[14.625rem] flex-none cursor-pointer overflow-hidden rounded-[0.625rem] bg-bg-sf1",
                className
            )}
        >
            <div className="flex flex-col">
                <ImagePlaceholder
                    // src={data.imageUrl}
                    src={img_cask}
                    width={546}
                    height={240}
                    alt={`cask_${data.name}`}
                    className="aspect-[234/180] w-full"
                />
                <div className="flex flex-col gap-4 px-4 py-6">
                    <div className="flex flex-col">
                        <h3 className="mb-1 text-lg font-medium text-typo-primary">
                            {data.name}
                        </h3>
                        <div className="text-sm text-typo-sub">
                            {data.distillery?.name}
                        </div>
                    </div>
                    <div className="flex-between flex-row">
                        <div className="flex-col gap-1">
                            <div className="text-sm text-typo-sub">
                                Lowest Ask
                            </div>
                            <div className="text-lg font-medium text-typo-primary">
                                {formatCurrency(data.currentValuation)}
                            </div>
                        </div>
                        <div className="flex-col gap-1">
                            <div className="text-sm uppercase text-typo-sub">
                                ABV
                            </div>
                            <div className="text-base text-typo-body">
                                {data.abv}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-center pointer-events-none absolute right-[0.625rem] top-[0.625rem] z-20 flex h-10 w-10 rounded-full opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
                <Heart className="h-4 w-4 text-typo-dark-primary" />
            </div>
        </div>
    );
}

export function CaskCardSkeleton() {
    return (
        <div className="flex flex-1 flex-col gap-6">
            <Skeleton className="aspect-[234/180] w-[14.625rem] rounded-lg" />
            <div className="flex flex-col gap-2">
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-2 w-5/6" />
                <Skeleton className="h-2 w-4/6" />
                <Skeleton className="h-2 w-3/6" />
            </div>
        </div>
    );
}
