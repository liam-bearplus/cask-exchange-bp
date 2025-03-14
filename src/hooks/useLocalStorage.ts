import { useState, useEffect, useCallback } from "react";

export const useLocalStorage = <T>({
    key,
    defaultValue,
}: {
    key: string;
    defaultValue: T;
}) => {
    const [value, setValue] = useState<T>(defaultValue);

    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            const storedValue = localStorage.getItem(key);
            if (storedValue !== null) {
                setValue(JSON.parse(storedValue));
            }
        } catch (error) {
            console.warn(`Error parsing localStorage key "${key}":`, error);
        }
    }, [key]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            if (value === undefined) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, value]);

    const getValue = useCallback(() => {
        if (typeof window === "undefined") return defaultValue;
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue !== null
                ? JSON.parse(storedValue)
                : defaultValue;
        } catch (error) {
            console.warn(`Error parsing localStorage key "${key}":`, error);
            return defaultValue;
        }
    }, [key, defaultValue]);

    return { value, setValue, getValue };
};
