"use client";

import { ReactScan } from "@/components/shared/scan";
import queryClientConfig from "@/config/tanstack";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
    return (
        <SessionProvider>
            <QueryClientProvider client={queryClientConfig}>
                <ReactQueryDevtools initialIsOpen={false} />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <ReactScan />
                </ThemeProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
}
