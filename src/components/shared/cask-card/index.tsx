import { cn, formatCurrency } from "@/lib/utils";
import { TCask } from "@/types";
import React from "react";
import ImagePlaceholder from "../image-placeholder";
import { Heart } from "lucide-react";

type TCaskProps = {
    className?: string;
    data: TCask;
};
export default function CaskCardItem({ className, data }: TCaskProps) {
    return (
        <div
            className={cn(
                "group relative w-[17.0625rem] flex-none cursor-pointer overflow-hidden rounded-[0.625rem] bg-black",
                className
            )}
        >
            <div className="flex flex-col">
                <ImagePlaceholder
                    // src={data.imageUrl}
                    src={"/images/cask_mock.jpg"}
                    width={546}
                    height={240}
                    alt={`cask_${data.name}`}
                    className="aspect-[273/162] w-full"
                />
                <div className="flex flex-col gap-4 p-4">
                    <div className="flex flex-col">
                        <h3 className="mb-1 text-lg font-medium text-typo-dark-primary">
                            {data.name}
                        </h3>
                        <div className="text-sm text-typo-sub">
                            {data.distillery?.name}
                        </div>
                    </div>
                    <div className="flex-between flex-row">
                        <div className="flex-col gap-1">
                            <div className="text-sm text-typo-disable">
                                Lowest Ask
                            </div>
                            <div className="text-lg font-medium text-typo-brand">
                                {formatCurrency(data.currentValuation)}
                            </div>
                        </div>
                        <div className="flex-col gap-1">
                            <div className="text-sm uppercase text-typo-disable">
                                ABV
                            </div>
                            <div className="text-base text-typo-disable">
                                {data.abv}%
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
