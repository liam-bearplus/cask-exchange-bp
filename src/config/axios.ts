// utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor: attach tokens if needed
axiosInstance.interceptors.request.use(
    (config) => {
        // Optionally get token from storage and attach to headers
        // config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: centralized error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle common error statuses
        return Promise.reject(error);
    }
);

export default axiosInstance;
