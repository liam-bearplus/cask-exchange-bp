"use client";

import queryClientConfig from "@/config/tanstack";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";

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
                </ThemeProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
}
