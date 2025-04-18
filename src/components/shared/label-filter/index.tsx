import React from "react";
import IconClose from "../icons/icon-close";
import { useBoundStore } from "@/store";
import { TCaskFilter } from "@/types";
import { handleConvertOriginal } from "@/helpers";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams.ts";
import { PARAMS } from "@/lib/constants/route";

type TLabel = {
    label?: string | number;
    value?: string | number;
    id?: string;
    className?: string;
    type: TCaskFilter;
    onClick?: () => void;
};

export default function LabelFilter(props: TLabel) {
    const { label, value, id, onClick, className, type } = props;
    const { deleteTag } = useBoundStore();
    const { updateParams } = useUpdateSearchParams(PARAMS.filter);
    const handleAction = () => {
        onClick?.();

        const filterCask = deleteTag({
            id: id || "",
            type: type,
        });
        const params = handleConvertOriginal(filterCask);
        updateParams(params);
    };
    return (
        <div className={className} data-label={`${id}-${value}-${type}`}>
            <div className="select-none rounded-sm border border-bd-sf1 py-1 pl-2.5 pr-1 text-typo-body transition-all hover:bg-bg-sf1">
                <div className="flex flex-row items-center gap-[0.1875rem]">
                    <div
                        data-value={value}
                        className="whitespace-nowrap text-sm font-medium"
                    >
                        {label && <span>{label}:</span>} <span>{value}</span>
                    </div>
                    <div
                        className="h-4 w-4 cursor-pointer text-typo-disable transition-all hover:text-typo-body [&_path]:stroke-current"
                        onClick={handleAction}
                    >
                        <IconClose />
                    </div>
                </div>
            </div>
        </div>
    );
}
