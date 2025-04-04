import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    crossOrigin: "anonymous",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.vivino.com",
            },
            {
                protocol: "https",
                hostname: "thumbs.vivino.com",
            },
            {
                protocol: "https",
                hostname: "example.com",
                port: "",
                pathname: "/cask-images/**",
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,DELETE,PATCH,POST,PUT",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
