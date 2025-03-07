export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Khoi Store";

export const APP_DESCRIPTION =
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
    "E-Commerce Course with Nextjs 15 and React 19";

export const SERVER_URL =
    process.env.NEXT_PUBLIC_SERVICE_URL || "http://localhost:3000";

export const LATEST_PRODUCTS_LIMIT =
    Number(process.env.LATEST_PRODUCTS_LIMIT) || 8;

export const signInDefaultValues = {
    email: "",
    password: "",
};

export const signUpDefaultValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    inviteCode: undefined,
    email: "",
    password: "",
    consent: false,
};

export const ForgotPasswordDefaultValues = {
  email: "",
}

export const UpdatePasswordDefaultValues = {
  newPassword: "",
  confirmPassword: "",
}

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
