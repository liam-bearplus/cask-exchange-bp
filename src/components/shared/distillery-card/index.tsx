import { TDistillery } from "@/types";
import React from "react";
import ImagePlaceholder from "../image-placeholder";
import { cn } from "@/lib/utils";

type TProps = {
    className?: string;
    data: TDistillery;
};
export default function DistilleryCard(props: TProps) {
    const { data, className } = props;
    return (
        <div
            className={cn(
                "flex min-w-[9.375rem] flex-shrink-0 flex-col items-center gap-3",
                className
            )}
        >
            <div className="aspect-square w-full overflow-hidden rounded-lg">
                <ImagePlaceholder
                    src={"/images/distillery-img.jpg"}
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
