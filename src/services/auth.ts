import axiosInstance from "@/config/axios";
import {
    KEY_FORGOT_PASSWORD,
    KEY_RESEND_EMAIL,
    KEY_RESET_PASSWORD,
    KEY_SIGNIN,
    KEY_SIGNUP,
    KEY_VERIFY,
} from "@/lib/constants/key";
import { PATH_AUTH } from "@/lib/constants/path";
import { handleRequest } from "@/lib/utils";
import {
    TLoginUser,
    TUpdatePassword,
    TRegisterUser,
    TUserSchema,
    TForgotPassword,
    TVerifyUser,
} from "@/types";

export const registerUser = async (
    data: TRegisterUser
): Promise<TUserSchema> => {
    return handleRequest(
        axiosInstance.post<TUserSchema>(`${PATH_AUTH}/${KEY_SIGNUP}`, data)
    );
};
export const verifyUser = async (data: TVerifyUser) => {
    return handleRequest(
        axiosInstance.post(`${PATH_AUTH}/${KEY_VERIFY}`, data)
    );
};

export const loginUser = async (data: TLoginUser): Promise<TUserSchema> => {
    return handleRequest(
        axiosInstance.post<TUserSchema>(`${PATH_AUTH}/${KEY_SIGNIN}`, data)
    );
};
export const resendEmailVerification = async (email: string) => {
    return handleRequest(
        axiosInstance.post(`${PATH_AUTH}/${KEY_RESEND_EMAIL} `, { email })
    );
};

export const updatePassword = async (data: TUpdatePassword) => {
    return handleRequest(axiosInstance.put("/user/change-password", data));
};

export const updateUser = async (
    data: Partial<TUserSchema>
): Promise<TUserSchema> => {
    return handleRequest(
        axiosInstance.put<TUserSchema>("/api/user/update", data)
    );
};

export const fetchUser = async (): Promise<TUserSchema> => {
    return handleRequest(axiosInstance.get<TUserSchema>("/user/get-info"));
};

export const forgotPassword = async (data: TForgotPassword) => {
    return handleRequest(
        axiosInstance.post(`${PATH_AUTH}/${KEY_FORGOT_PASSWORD}`, data)
    );
};

export const resetPassword = async (data: {
    token: string;
    password: string;
}) => {
    return handleRequest(
        axiosInstance.post(`${PATH_AUTH}/${KEY_RESET_PASSWORD} `, data)
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

export const updateFcmToken = async (webFcmToken: string) => {
    return handleRequest(axiosInstance.put("/api/user/fcm", { webFcmToken }));
};
