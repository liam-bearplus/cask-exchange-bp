import React from "react";
import IconClose from "../icons/icon-close";

type TLabel = {
    label: string;
    value: string;
    className?: string;
    onClick?: () => void;
};

export default function LabelFilter(props: TLabel) {
    const { label, value, onClick, className } = props;
    return (
        <div className={className}>
            <div className="select-none rounded-sm border border-bd-sf1 py-1 pl-2.5 pr-1">
                <div className="flex flex-row items-center gap-[0.1875rem]">
                    <div data-value={value}>{label}</div>
                    <div
                        className="h-4 w-4 text-typo-disable"
                        onClick={onClick}
                    >
                        <IconClose />
                    </div>
                </div>
            </div>
        </div>
    );
}
