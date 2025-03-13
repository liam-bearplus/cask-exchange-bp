import { AxiosResponse, isAxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Convert prisma object into a regular JS object
export function convertToPlainObject<T>(value: T): T {
    return JSON.parse(JSON.stringify(value));
}

// Format number with decimal place
export function formatNumberWithDecimal(num: number): string {
    const [int, decimal] = num.toString().split(".");
    return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

// Format error
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
    if (error.name === "ZodError") {
        // Handle Zod errors here
        const fieldErrors = Object.keys(error.errors).map(
            (field) => error.errors[field].message
        );
        return fieldErrors.join(". ");
    } else if (
        error.name === "PrismaClientKnownRequestError" &&
        error.code === "P2002"
    ) {
        // Handle Prisma errors here
        const field = error.meta?.target ? error.meta.target[0] : "Field";
        return `${
            (field as string).charAt(0).toUpperCase() +
            (field as string).slice(1)
        } already exists.`;
    } else {
        return typeof error.message === "string"
            ? error.message
            : JSON.stringify(error);
    }
}

// Round number to 2 number places
export function round2(value: number | string): number {
    if (typeof value === "number") {
        return Math.round((value + Number.EPSILON) * 100) / 100;
    } else if (typeof value === "string") {
        return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
    } else {
        throw new Error("Value's type is not string or number.");
    }
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2,
});

// Format currency using the formater above
export function formatCurrency(amount: number | string | null) {
    if (typeof amount === "number") {
        return CURRENCY_FORMATTER.format(amount);
    } else if (typeof amount === "string") {
        return CURRENCY_FORMATTER.format(Number(amount));
    } else {
        return "NaN";
    }
}

// Format Number
const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

export function formatNumber(number: number) {
    return NUMBER_FORMATTER.format(number);
}

// Shorten UUID
export function formatId(id: string) {
    return `..${id.substring(id.length - 6)}`;
}

// Format date and times
export const formatDateTime = (dateString: Date) => {
    const dateTimeOptions: Intl.DateTimeFormatOptions = {
        month: "short", // abbreviated month name (e.g., 'Oct')
        year: "numeric", // abbreviated month name (e.g., 'Oct')
        day: "numeric", // numeric day of the month (e.g., '25')
        hour: "numeric", // numeric hour (e.g., '8')
        minute: "numeric", // numeric minute (e.g., '30')
        hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    };
    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "short", // abbreviated weekday name (e.g., 'Mon')
        month: "short", // abbreviated month name (e.g., 'Oct')
        year: "numeric", // numeric year (e.g., '2023')
        day: "numeric", // numeric day of the month (e.g., '25')
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "numeric", // numeric hour (e.g., '8')
        minute: "numeric", // numeric minute (e.g., '30')
        hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    };
    const formattedDateTime: string = new Date(dateString).toLocaleString(
        "en-US",
        dateTimeOptions
    );
    const formattedDate: string = new Date(dateString).toLocaleString(
        "en-US",
        dateOptions
    );
    const formattedTime: string = new Date(dateString).toLocaleString(
        "en-US",
        timeOptions
    );
    return {
        dateTime: formattedDateTime,
        dateOnly: formattedDate,
        timeOnly: formattedTime,
    };
};

// Form the pagination links

export function formUrlQuery({
    params,
    key,
    value,
}: {
    params: string;
    key: string;
    value: string | null;
}) {
    const query = qs.parse(params);

    query[key] = value;
    return qs.stringifyUrl(
        {
            url: window.location.pathname,
            query,
        },
        {
            skipNull: true,
        }
    );
}

// Helper to standardize API call error handling

export const handleRequest = async <T>(
    promise: Promise<AxiosResponse<T>>
): Promise<T> => {
    try {
        const response = await promise;
        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw new Error(
                error?.response?.data?.message || "Something went wrong"
            );
        }
        throw new Error("An unexpected error occurred");
    }
};
