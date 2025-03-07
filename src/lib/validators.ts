import parsePhoneNumber, { CountryCode } from "libphonenumber-js";
import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places"
  );

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
      .nonempty({ message: "First Name is required" })
      .min(3, "Name must be at 3 characters long"),
    lastName: z
      .string()
      .nonempty({ message: "Last Name is required" })
      .min(3, "Name must be at 3 characters long"),
    email: z.string().nonempty("Email required").email("Invalid email address"),
    inviteCode: z.string().optional(),
    password: z
      .string()
      .min(8, "Password must be at 8 characters long")
      .regex(/[a-z]/, "Must contain at least 1 lowercase letter")
      .regex(/[A-Z]/, "Must contain at least 1 uppercase letter")
      .regex(
        /^(?=.*[0-9!@#$%^&*(),.?":{}|<>]).*$/,
        "Must contain at least one number or special character"
      ),
    phoneNumber: z.string().nonempty("Phone number is required"),
    country: z.string().nonempty("Country is required").optional(),
    consent: z.boolean().refine((val) => val === true, {
      message: "Please read and accept the terms and conditions",
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
      message: "NumberPhone Invalid",
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

// UpdatePasswordFormValue schema based on the UpdatePasswordFormValue type
export const updatePasswordFormSchema = z
  .object({
    currentPassword: z.string().nonempty("Current password is required"),
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
