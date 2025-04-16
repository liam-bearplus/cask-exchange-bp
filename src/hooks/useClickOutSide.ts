import React from "react";

export default function useClickOutSide(
    cb: () => void,
    ref: React.RefObject<HTMLDivElement | null>
) {
    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            cb();
        }
    };
    React.useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [cb]);
}
