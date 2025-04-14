import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatCurrency } from "@/lib/utils";
import { TCask } from "@/types";
import ImagePlaceholder from "../image-placeholder";

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
                "group relative flex-none [&_*]:select-none",
                className
            )}
        >
            <div className="flex w-full cursor-pointer flex-col overflow-hidden rounded-[0.625rem] bg-bg-sf1 transition-all group-hover:shadow-[0px_0.5rem_1.5rem_0px_rgba(149,157,165,0.20)]">
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
                        <h3 className="mb-1 text-lg font-medium text-typo-primary group-hover:underline">
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
                                {data.abv}%
                            </div>
                        </div>
                    </div>
                </div>
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
