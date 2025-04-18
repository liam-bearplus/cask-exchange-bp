"use client";

import { useBoundStore } from "@/store";
import Footer from "./footer";
import Header from "./header";
import authService from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import { KEY_WHOAMI } from "@/lib/constants/key";
import { useEffect } from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { setMyUser } = useBoundStore();
    const whoamiQuery = useQuery({
        queryKey: [KEY_WHOAMI],
        queryFn: authService.whoami,
    });
    useEffect(() => {
        if (whoamiQuery.data) {
            setMyUser(whoamiQuery.data);
        }
    }, [whoamiQuery.data]);

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
