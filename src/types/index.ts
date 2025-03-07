import {
  paymentResultSchema,
  signUpFormSchema,
  updatePasswordFormSchema,
  userSchema,
  signInFormSchema,
  forgotPasswordFormSchema,
} from "@/lib/validators";
import { z } from "zod";

export type TPaymentResult = z.infer<typeof paymentResultSchema>;
export type TSalesDataType = {
    month: string;
    totalSales: number;
}[];
export type TDataCountryWithNumber = Record<string, string>;

export type TUserSchema = z.infer<typeof userSchema>;
export type TRegisterUser = z.infer<typeof signUpFormSchema>;
export type TLoginUser = z.infer<typeof signInFormSchema>;
export type TForgotPassword = z.infer<typeof forgotPasswordFormSchema>;
export type TUpdatePassword = z.infer<typeof updatePasswordFormSchema>;
