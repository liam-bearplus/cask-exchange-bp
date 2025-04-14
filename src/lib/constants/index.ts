export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "CaskX Exchange";

export const APP_DESCRIPTION =
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
    "E-Commerce Course with Nextjs 15 and React 19";

export const SERVER_URL =
    process.env.NEXT_PUBLIC_SERVICE_URL || "http://localhost:3000";

export const LATEST_PRODUCTS_LIMIT =
    Number(process.env.LATEST_PRODUCTS_LIMIT) || 8;

export const TIMER_RESEND_SECONDS = 60;

export const TIMER_REDIRECT = 5;

export const signInDefaultValues = {
    email: "",
    password: "",
    rememberMe: false,
};
export const resendVerifyUser = {
    email: "",
};
export const signUpDefaultValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    inviteCode: "",
    email: "",
    password: "",
    consent: false,
};

export const ForgotPasswordDefaultValues = {
    email: "",
};

export const UpdatePasswordDefaultValues = {
    newPassword: "",
    confirmPassword: "",
};

export const shippingAddressDefaultValues = {
    fullName: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    country: "",
};

export const DEFAULT_PAGE_SIZE = process.env.DEFAULT_PAGE_SIZE
    ? Number(process.env.DEFAULT_PAGE_SIZE)
    : 10;
export const pointSchema = {
    weak: {
        match: 1,
        minLength: 0,
        point: 1,
    },
    normal: {
        match: 2,
        minLength: 8,
        point: 2,
    },
    medium: {
        match: 3,
        minLength: 12,
        point: 3,
    },
    strong: {
        match: 4,
        minLength: 20,
        point: 4,
    },
};
export const passwordConstraintContent: {
    id: number;
    name: string;
    message: string;
    regex: RegExp;
}[] = [
    {
        id: 1,
        name: "minLength",
        message: "Password must be at least 8 characters",
        regex: /^.{8,}$/,
    },
    {
        id: 2,
        name: "lowercase",
        message: "Must contain at least 1 lowercase letter",
        regex: /^(?=.*[a-z]).*$/,
    },
    {
        id: 3,
        name: "uppercase",
        message: "Must contain at least 1 uppercase letter",
        regex: /^(?=.*[A-Z]).*$/,
    },
    {
        id: 4,
        name: "number",
        message: "Must contain at least 1 number or special character",
        regex: /^(?=.*[0-9!@#$%^&*(),.?":{}|<>]).*$/,
    },
];

export const MENU_NAVIGATION = [
    {
        title: "Cask Listing",
        href: "/list-data",
        isNewWindow: false,
    },
    {
        title: "Dashboard",
        href: "/dashboard",
        isNewWindow: false,
    },
    {
        title: "My Portfolio",
        href: "/profile",
        isNewWindow: false,
    },
    {
        title: "Buying",
        href: "/markets",
        isNewWindow: false,
        subItems: [
            {
                title: "Active bids",
                href: "#",
                isNewWindow: false,
            },
            {
                title: "On-going transactions",
                href: "#",
                isNewWindow: false,
            },
            {
                title: "Completed orders",
                href: "#",
                isNewWindow: false,
            },
        ],
    },
    {
        title: "Selling",
        href: "/selling",
        isNewWindow: false,
        subItems: [
            {
                title: "New listing",
                href: "#",
                isNewWindow: false,
            },
            {
                title: "Active asks",
                href: "#",
                isNewWindow: false,
            },
            {
                title: "Pending asks",
                href: "#",
                isNewWindow: false,
            },
            {
                title: "Sales history",
                href: "#",
                isNewWindow: false,
            },
        ],
    },
];
export const filterCaskValDefault = {
    distillery: [],
    caskType: [],
    year: [],
    abv: [],
    rla: [],
    ola: [],
    bottles: [],
    price: [],
};
export const MAP_KEY_FILTER_CASK = {
    distillery: "distilleryIds",
    caskType: "caskTypeIds",
    year: {
        min: "minVintageYear",
        max: "maxVintageYear",
    },
    abv: {
        min: "minAbv",
        max: "maxAbv",
    },
    rla: {
        min: "minRla",
        max: "maxRla",
    },
    ola: {
        min: "minOla",
        max: "maxOla",
    },
    bottles: {
        min: "minEstimatedBottleCount",
        max: "maxEstimatedBottleCount",
    },
    price: {
        min: "minPrice",
        max: "maxPrice",
    },
};
export type TOptionCheckBox = {
    label: string;
    value: string;
    checked: boolean;
    id?: string;
};
export type TOptionRange = number[];

type FilterTypes = {
    checkbox: TOptionCheckBox[];
    range: TOptionRange;
};

export type TDataFilterCask<T extends keyof FilterTypes = keyof FilterTypes> = {
    [key: string]: {
        title: string;
        name: string;
        type: T;
        options: FilterTypes[T];
    };
};
export type TOptions<T extends keyof FilterTypes> = FilterTypes[T];

export const DATA_FILTER_CASKS: TDataFilterCask = {
    distillery: {
        title: "Distillery",
        name: "distillery",
        type: "checkbox" as const,
        options: [
            {
                label: "All",
                value: "all", // empty is for all
                checked: false,
                id: "all",
            },
        ],
    },
    caskType: {
        title: "CaskType",
        name: "caskType",
        type: "checkbox",
        options: [
            {
                label: "All",
                value: "all", // empty is for all
                checked: false,
                id: "all",
            },
        ],
    },
    year: {
        title: "Year",
        type: "range",
        name: "year",
        options: [0, 0],
    },
    abv: {
        title: "ABV",
        type: "range",
        name: "abv",
        options: [0, 0],
    },
    rla: {
        title: "RLA",
        type: "range",
        name: "rla",
        options: [0, 0],
    },
    ola: {
        title: "OLA",
        type: "range",
        name: "ola",
        options: [0, 0],
    },
    price: {
        title: "Price",
        type: "range",
        name: "price",
        options: [0, 0],
    },
    bottles: {
        title: "Bottles",
        type: "range",
        name: "bottles",
        options: [0, 0],
    },
};
