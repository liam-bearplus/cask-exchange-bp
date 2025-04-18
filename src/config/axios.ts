import authService from "@/services/auth";
import axios, { AxiosRequestConfig } from "axios";
import { deleteCookie, setCookie } from "cookies-next";
import { encode } from "next-auth/jwt";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Credentials": "true",
        "X-Requested-With": "XMLHttpRequest",
        "X-Forwarded-Proto": "https",
    },
});

axiosInstance.interceptors.request.use(async (request) => {
    if (!isAccessTokenAttachedToAxiosDefaults())
        await setAccessTokenOnRequestAndAsAxiosDefaults(request);
    return request;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401 && cachedRefreshToken) {
            await refreshAccessToken();
            return axiosInstance(error.config);
        }
        return Promise.reject(error);
    }
);
const isAccessTokenAttachedToAxiosDefaults = () => {
    const authHeader = axiosInstance.defaults.headers.common["Authorization"];
    if (authHeader === null || authHeader === undefined || authHeader === "")
        return false;
    else return true;
};

let cachedAccessToken: string | null = null;
let cachedRefreshToken: string | null = null;

//Add Bear AccessToken
const setAccessTokenOnRequestAndAsAxiosDefaults = async (
    request: AxiosRequestConfig
) => {
    if (!cachedAccessToken) {
        const session = await getSession();
        if (session && session.user.accessToken) {
            cachedAccessToken = session.user.accessToken;
            cachedRefreshToken = session.user.refreshToken || null;
            axiosInstance.defaults.headers.common["Authorization"] =
                `Bearer ${cachedAccessToken}`;
        }
    }

    if (cachedAccessToken) {
        if (!request.headers) request.headers = {};
        request.headers.Authorization = `Bearer ${cachedAccessToken}`;
    }
};
//Refresh Token
const refreshAccessToken = async () => {
    if (cachedRefreshToken) {
        const response = await authService.refreshToken({
            refreshToken: cachedRefreshToken,
        });
        cachedAccessToken = response?.accessToken || "";
        const session = await getSession();

        const newSessionToken = await encode({
            secret: process.env.NEXTAUTH_SECRET!,
            token: {
                ...session,
                accessToken: cachedAccessToken,
                refreshToken: cachedRefreshToken,
            },
        });
        updateCookie(newSessionToken);
        axiosInstance.defaults.headers.common["Authorization"] =
            `Bearer ${cachedAccessToken}`;
    } else {
        cachedAccessToken = null;
    }
};

async function updateCookie(sessionToken: string | null) {
    const sessionCookie = process.env.NEXTAUTH_URL?.startsWith("https://")
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token";

    if (sessionToken) {
        // set request cookies for the incoming getServerSession to read new session

        setCookie(sessionCookie, sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });
    } else {
        deleteCookie(sessionCookie);
    }
}

// Remove AccessToken SignOut
export const unsetAccessTokenAttachedToAxiosDefaults = async () => {
    delete axiosInstance.defaults.headers.common["Authorization"];
};

export default axiosInstance;
