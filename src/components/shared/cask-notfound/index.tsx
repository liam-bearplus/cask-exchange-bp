import Image from "next/image";
import React from "react";

export default function CaskEmpty() {
    return (
        <div className="mb-12 mt-6 w-full py-[7.5rem]">
            <div className="mx-auto flex flex-col items-center">
                <div className="mb-6 w-[11.5625rem]">
                    <Image
                        src="/images/cask-empty.png"
                        width={390}
                        height={360}
                        alt="Cask Empty"
                        className="img"
                    />
                </div>
                <div className="flex max-w-[18.75rem] flex-col items-center gap-4 text-center">
                    <div className="text-xl font-medium text-typo-primary">
                        No exact matches found
                    </div>
                    <div className="text-sm text-typo-body">
                        Try a wider search or adjust your filters. There’s
                        always something worth investing in.
                    </div>
                </div>
            </div>
        </div>
    );
}
