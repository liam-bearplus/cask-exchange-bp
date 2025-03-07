// services/userApi.ts
import axiosInstance from "@/config/axios";
import { handleRequest } from "@/lib/utils";
import { TLoginUser, TPasswordForm, TRegisterUser, TUserSchema } from "@/types";

export const registerUser = async (
    data: TRegisterUser
): Promise<TUserSchema> => {
    return handleRequest(
        axiosInstance.post<TUserSchema>("/auth/register", data)
    );
};

export const loginUser = async (data: TLoginUser): Promise<TUserSchema> => {
    return handleRequest(axiosInstance.post<TUserSchema>("/auth/login", data));
};

export const updatePassword = async (
    data: TPasswordForm
): Promise<{ message: string }> => {
    return handleRequest(
        axiosInstance.put<{ message: string }>(
            "/api/user/change-password",
            data
        )
    );
};

export const updateUser = async (
    data: Partial<TUserSchema>
): Promise<TUserSchema> => {
    return handleRequest(
        axiosInstance.put<TUserSchema>("/api/user/update", data)
    );
};

export const fetchUser = async (): Promise<TUserSchema> => {
    return handleRequest(axiosInstance.get<TUserSchema>("/api/user/get-info"));
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

export const getUserDetail = async (id: number): Promise<TUserSchema> => {
    return handleRequest(
        axiosInstance.get<TUserSchema>(`/api/user-management/${id}`)
    );
};

export const updateFcmToken = async (
    webFcmToken: string
): Promise<{ message: string }> => {
    return handleRequest(
        axiosInstance.put<{ message: string }>("/api/user/fcm", { webFcmToken })
    );
};
