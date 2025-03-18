import React from "react";

export default function IconLoading() {
    return (
        <div className="h-full min-h-10 w-full min-w-10">
            <div className="relative h-full w-full">
                {Array.from({ length: 8 }).map((_, index) => {
                    const angle = (360 / 8) * (index + 1);
                    return (
                        <div
                            key={index}
                            className="h-3 w-0.5 origin-bottom bg-brand"
                            style={{
                                transform: `rotate(${angle}deg) translate(30px) rotate(-${angle}deg)`,
                            }}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
}
