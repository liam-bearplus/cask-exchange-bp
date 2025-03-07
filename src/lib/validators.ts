import parsePhoneNumber, { CountryCode } from "libphonenumber-js";
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
    email: z.string().email("Invalid email address").nonempty("Email required"),
    password: z.string().min(6, "Password must be at 6 characters long"),
});

// Schema for signing users in
export const signUpFormSchema = z
    .object({
        firstName: z
            .string()
            .nonempty({ message: "Please enter your first name" })
            .min(3, "First name must be at least 3 characters long"),
        lastName: z
            .string()
            .nonempty({ message: "Please enter your last name" })
            .min(3, "Last name must be at least 3 characters long"),
        email: z
            .string()
            .nonempty("Please enter your email")
            .email("Please provide a valid email address"),
        inviteCode: z.string().optional(),
        password: z
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
        phoneNumber: z.string().nonempty("Please enter your phone number"),
        country: z.string().nonempty("Please select your country").optional(),
        consent: z.boolean().refine((val) => val === true, {
            message: "You must agree to the terms and conditions to proceed",
        }),
    })
    .refine(
        (data) => {
            const phoneNumber = parsePhoneNumber(
                data.phoneNumber,
                data.country as CountryCode
            );
            return phoneNumber && phoneNumber.isValid();
        },
        {
            message: "Please provide a valid phone number",
            path: ["phoneNumber"],
        }
    );
// Schema for payment method schema
export const paymentResultSchema = z.object({
    id: z.string(),
    status: z.string(),
    email_address: z.string(),
    pricePaid: z.string(),
});

// Schema for shipping address
export const updateProfileSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().min(3, "Email must be at least 3 characters long"),
});

// User schema based on the User interface
export const userSchema = z.object({
    email: z.string().email("Invalid email address").nonempty("Email required"),
    firstName: z.string().nonempty("First name is required"),
    id: z.number(),
    lastName: z.string().nonempty("Last name is required"),
    phoneNumber: z.string().nonempty("Phone number is required"),
    createdDate: z.string().nonempty("Created date is required"),
});

export const forgotPasswordFormSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email required"),
});

// UpdatePasswordFormValue schema based on the UpdatePasswordFormValue type
export const updatePasswordFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
