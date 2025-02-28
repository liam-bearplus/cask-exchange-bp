import {
  cartItemSchema,
  insertCartSchema,
  insertOrderItemSchema,
  insertProductSchema,
  paymentResultSchema,
  registerUserSchema,
  shippingAddressSchema,
  updatePasswordFormSchema,
  userSchema,
} from "@/lib/validators";
import { z } from "zod";
export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
export type OrderItem = z.infer<typeof insertOrderItemSchema>;
export type PaymentResult = z.infer<typeof paymentResultSchema>;
export type SalesDataType = {
  month: string;
  totalSales: number;
}[];

export type UserSchema = z.infer<typeof userSchema>;
export type RegisterUser = z.infer<typeof registerUserSchema>;
export type PasswordForm = z.infer<typeof updatePasswordFormSchema>;
