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

export const MENU_NAVIGATIONS = [
    {
        title: "All cask",
        href: "/casks",
        isNewWindow: false,
        icon: "/icons/cask-icon.svg",
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
                title: "Content 1",
                href: "#",
                isNewWindow: false,
            },
            {
                title: "Content 2",
                href: "#",
                isNewWindow: false,
            },
            {
                title: "Content 3",
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
                title: "Content 1",
                href: "#",
                isNewWindow: false,
            },
            {
                title: "Content 2",
                href: "#",
                isNewWindow: false,
            },
            {
                title: "Content 3",
                href: "#",
                isNewWindow: false,
            },
        ],
    },
];
export const filterCaskValDefault: {
    distillery: string[];
    caskType: string[];
    year: number[];
    abv: number[];
    rla: number[];
    ola: number[];
    bottles: number[];
} = {
    distillery: [],
    caskType: [],
    year: [1930, 2050],
    abv: [0, 45],
    rla: [0, 45],
    ola: [0, 45],
    bottles: [0, 45],
};
export const MAP_KEY_FILTER_CASK = {
    distillery: "distillery.name",
    caskType: "cask.type",
    year: "cask.vintageYear",
    abv: "cask.abv",
    rla: "cask.rla",
    ola: "cask.ola",
    bottles: "cask.bottles",
};
export const DATA_FILTER_CASKS: {
    [key: string]: {
        title: string;
        name: string;
        type: "checkbox" | "range";
        options:
            | Array<{ label: string; value: string; checked: boolean }>
            | number[];
    };
} = {
    distillery: {
        title: "Distillery",
        name: "distillery",
        type: "checkbox",
        options: [
            { label: "All", value: "all", checked: false },
            { label: "Anberargie", value: "anberargie", checked: false },
            { label: "Aberflour", value: "aberflour", checked: false },
        ],
    },
    caskType: {
        title: "CaskType",
        name: "caskType",
        type: "checkbox",
        options: [
            {
                label: "All",
                value: "all",
                checked: false,
            },
            {
                label: "Sherry Burn",
                value: "sherry-burn",
                checked: false,
            },
            {
                label: "Hogshead",
                value: "hogshead",
                checked: false,
            },
        ],
    },
    year: {
        title: "Year",
        type: "range",
        name: "year",
        options: [1930, 2050],
    },
    abv: {
        title: "ABV",
        type: "range",
        name: "abv",
        options: [0, 45],
    },
    rla: {
        title: "RLA",
        type: "range",
        name: "rla",
        options: [0, 45],
    },
    ola: {
        title: "OLA",
        type: "range",
        name: "ola",
        options: [0, 45],
    },
    bottles: {
        title: "Bottles",
        type: "range",
        name: "bottles",
        options: [0, 100],
    },
};
