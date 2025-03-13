import { useEffect, useState } from "react";

export const useLocalStorage = <T>({
    key,
    defaultValue,
}: {
    key: string;
    defaultValue: T;
}) => {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            return JSON.parse(storedValue);
        }
        return defaultValue;
    });

    useEffect(() => {
        if (value === undefined) return;
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
    const getValue = () => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : null;
    };

    return { value, setValue, getValue };
};
