// services/userApi.ts
import axiosInstance from "@/config/axios";
import { handleRequest } from "@/lib/utils";
import { PasswordForm, RegisterUser, UserSchema } from "@/types";

export const registerUser = async (data: RegisterUser): Promise<UserSchema> => {
  return handleRequest(
    axiosInstance.post<UserSchema>("/api/auth/register", data)
  );
};

export const updatePassword = async (
  data: PasswordForm
): Promise<{ message: string }> => {
  return handleRequest(
    axiosInstance.put<{ message: string }>("/api/user/change-password", data)
  );
};

export const updateUser = async (
  data: Partial<UserSchema>
): Promise<UserSchema> => {
  return handleRequest(axiosInstance.put<UserSchema>("/api/user/update", data));
};

export const fetchUser = async (): Promise<UserSchema> => {
  return handleRequest(axiosInstance.get<UserSchema>("/api/user/get-info"));
};

export const forgotPassword = async (
  email: string
): Promise<{ message: string }> => {
  return handleRequest(
    axiosInstance.post<{ message: string }>("/api/auth/forgot-password", {
      email,
    })
  );
};

export const resetPassword = async (data: {
  token: string;
  password: string;
}): Promise<{ message: string }> => {
  return handleRequest(
    axiosInstance.put<{ message: string }>("/api/auth/reset-password", data)
  );
};

export const getUserList = async (params: {
  search: string;
  page?: number;
  pageSize?: number;
  sortField?: string;
  sortOrder?: string;
}): Promise<unknown> => {
  return handleRequest(
    axiosInstance.get<unknown>("/api/user-management", { params })
  );
};

export const getUserDetail = async (id: number): Promise<UserSchema> => {
  return handleRequest(
    axiosInstance.get<UserSchema>(`/api/user-management/${id}`)
  );
};

export const updateFcmToken = async (
  webFcmToken: string
): Promise<{ message: string }> => {
  return handleRequest(
    axiosInstance.put<{ message: string }>("/api/user/fcm", { webFcmToken })
  );
};
