import axiosInstance from "@/config/axios";
import {
    KEY_CHECK_RESET_PASSWORD,
    KEY_FORGOT_PASSWORD,
    KEY_REFRESH_TOKEN,
    KEY_RESEND_EMAIL,
    KEY_RESET_PASSWORD,
    KEY_SIGNIN,
    KEY_SIGNUP,
    KEY_VERIFY,
} from "@/lib/constants/key";
import { PATH_AUTH } from "@/lib/constants/path";
import { handleRequest } from "@/lib/utils";
import {
    TForgotPassword,
    TLoginUser,
    TRegisterUser,
    TToken,
    TUserSchema,
    TVerifyUser,
} from "@/types";

class AuthService {
    async registerUser(data: TRegisterUser): Promise<TUserSchema> {
        return handleRequest(
            axiosInstance.post<TUserSchema>(`${PATH_AUTH}/${KEY_SIGNUP}`, data)
        );
    }

    async verifyUser(data: TVerifyUser): Promise<{ email: string }> {
        return handleRequest(
            axiosInstance.post(`${PATH_AUTH}/${KEY_VERIFY}`, data)
        );
    }
    async verifyTokenResetPassword(data: { token: string }) {
        return handleRequest(
            axiosInstance.post(`${PATH_AUTH}/${KEY_CHECK_RESET_PASSWORD}`, data)
        );
    }

    async loginUser(data: TLoginUser): Promise<TUserSchema> {
        return handleRequest(
            axiosInstance.post<TUserSchema>(`${PATH_AUTH}/${KEY_SIGNIN}`, data)
        );
    }

    async resendEmailVerification(email: string): Promise<void> {
        return handleRequest(
            axiosInstance.post(`${PATH_AUTH}/${KEY_RESEND_EMAIL}`, { email })
        );
    }

    async updateUser(data: Partial<TUserSchema>): Promise<TUserSchema> {
        return handleRequest(
            axiosInstance.put<TUserSchema>("/api/user/update", data)
        );
    }

    async fetchUser(): Promise<TUserSchema> {
        return handleRequest(axiosInstance.get<TUserSchema>("/user/get-info"));
    }

    async forgotPassword(data: TForgotPassword): Promise<void> {
        return handleRequest(
            axiosInstance.post(`${PATH_AUTH}/${KEY_FORGOT_PASSWORD}`, data)
        );
    }

    async resetPassword(data: {
        token: string;
        password: string;
    }): Promise<void> {
        return handleRequest(
            axiosInstance.post(`${PATH_AUTH}/${KEY_RESET_PASSWORD}`, data)
        );
    }

    async getUserList(params: {
        search: string;
        page?: number;
        pageSize?: number;
        sortField?: string;
        sortOrder?: string;
    }): Promise<unknown> {
        return handleRequest(
            axiosInstance.get<unknown>("/api/user-management", { params })
        );
    }

    async getUserDetail(id: number): Promise<TUserSchema> {
        return handleRequest(
            axiosInstance.get<TUserSchema>(`/api/user-management/${id}`)
        );
    }

    async refreshToken(data: { refreshToken: string }): Promise<TToken> {
        return handleRequest(
            axiosInstance.post<TToken>(
                `${PATH_AUTH}/${KEY_REFRESH_TOKEN}`,
                data
            )
        );
    }
}

const authService = new AuthService();
export default authService;
