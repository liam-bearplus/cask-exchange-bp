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
        <div className={cn("flex flex-col items-center gap-3", className)}>
            <ImagePlaceholder
                src={"/images/distillery-img.jpeg"}
                width={300}
                height={300}
                className="rounded-lg"
            />
            <div className="flex flex-col items-center gap-2">
                <div className="text-20 text-typo-primary">{data.name}</div>
                <div className="text-16 text-typo-secondary">{data.region}</div>
            </div>
        </div>
    );
}
