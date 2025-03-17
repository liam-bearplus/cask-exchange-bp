import { TCask } from "@/types";
import React from "react";
import CaskCardItem from "../cask-card";

export default function ListCask({
    lists,
    title,
}: {
    lists?: TCask[];
    title?: string;
}) {
    return (
        <div className="flex flex-col gap-6">
            {title && (
                <h2 className="text-3xl font-semibold text-typo-primary">
                    {title}
                </h2>
            )}
            <div className="flex flex-row gap-7">
                {lists?.map((cask) => {
                    return <CaskCardItem key={cask.id} data={cask} />;
                })}
            </div>
        </div>
    );
}
