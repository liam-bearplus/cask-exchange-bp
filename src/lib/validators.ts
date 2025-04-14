import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";
// import { formatNumberWithDecimal } from "./utils";

// const currency = z
//   .string()
//   .refine(
//     (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
//     "Price must have exactly two decimal places"
//   );

// Schema for signing users in
export const signInFormSchema = z.object({
    email: z
        .string()
        .nonempty("Email is required")
        .email("Please provide a properly formatted email address"),
    password: z.string().min(6, "Password must be at 6 characters long"),
    rememberMe: z.boolean().optional(),
});

// Schema for signing users in
export const signUpFormSchema = z.object({
    firstName: z
        .string()
        .nonempty({ message: "Please enter your first name" })
        .min(2, "First name must be at least 2 characters long"),
    lastName: z
        .string()
        .nonempty({ message: "Please enter your last name" })
        .min(2, "Last name must be at least 2 characters long"),
    email: z
        .string()
        .nonempty("Please enter your email")
        .email("Please provide a properly formatted email address"),
    inviteCode: z.string().optional(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[a-z]/, "Password must include at least one lowercase letter")
        .regex(/[A-Z]/, "Password must include at least one uppercase letter")
        .regex(
            /^(?=.*[0-9!@#$%^&*(),.?":{}|<>]).*$/,
            "Password must include at least one number or special character"
        ),
    phoneNumber: z
        .string()
        .nonempty("Please enter your phone number")
        .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
    consent: z.boolean().refine((val) => val === true, {
        message: "You must agree to the terms and conditions to proceed",
    }),
});

export const resendVerifyUserSchema = z.object({
    email: z
        .string()
        .nonempty("Please enter your email")
        .email("Please provide a properly formatted email address"),
});

// Schema for payment method schema
export const paymentResultSchema = z.object({
    id: z.string(),
    status: z.string(),
    email_address: z.string(),
    pricePaid: z.string(),
});

// Schema for shipping address
export const updateProfileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().min(2, "Email must be at least 2 characters long"),
});

// User schema based on the User interface
export const userSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .nonempty("Email is required"),
    firstName: z.string().nonempty("First name is required"),
    id: z.string(),
    lastName: z.string().nonempty("Last name is required"),
    phoneNumber: z.string().nonempty("Phone number is required"),
    createdDate: z.string().nonempty("Created date is required"),
});

export const forgotPasswordFormSchema = z.object({
    email: z
        .string()
        .nonempty("Email is required")
        .email("Please provide a properly formatted email address"),
});

// UpdatePasswordFormValue schema based on the UpdatePasswordFormValue type
export const updatePasswordFormSchema = z
    .object({
        newPassword: z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .regex(
                /[a-z]/,
                "Password must include at least one lowercase letter"
            )
            .regex(
                /[A-Z]/,
                "Password must include at least one uppercase letter"
            )
            .regex(
                /^(?=.*[0-9!@#$%^&*(),.?":{}|<>]).*$/,
                "Password must include at least one number or special character"
            ),
        confirmPassword: z
            .string()
            .min(8, "Confirm Password must be at least 8 characters long")
            .regex(
                /[a-z]/,
                "Confirm Password must include at least one lowercase letter"
            )
            .regex(
                /[A-Z]/,
                "Confirm Password must include at least one uppercase letter"
            )
            .regex(
                /^(?=.*[0-9!@#$%^&*(),.?":{}|<>]).*$/,
                "Confirm Password must include at least one number or special character"
            ),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
export const searchSchema = z.object({
    search: z.string().optional(),
});
export const filterSchema = z.object({
    distillery: z.array(z.string()).optional(),
    caskType: z.array(z.string()).optional(),
    year: z.array(z.number()).optional(),
    abv: z.array(z.number()).optional(),
    rla: z.array(z.number()).optional(),
    ola: z.array(z.number()).optional(),
    bottles: z.array(z.number()).optional(),
    price: z.array(z.number()).optional(),
});
