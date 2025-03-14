"use client";

import SplashScreen from "@/components/shared/auth/splash-screen";
import useClearCacheMutation from "@/hooks/useClearCacheMutation";
import { APP_NAME } from "@/lib/constants";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    useClearCacheMutation();
    return (
        <div className="min-h-screen w-full">
            <div className="relative grid h-full min-h-screen w-full grid-cols-2">
                <SplashScreen />
                <div className="flex-center relative flex-col py-28">
                    <div className="grid w-full grid-cols-12 gap-4 px-5">
                        <div className="col-start-2 -col-end-2 mx-auto w-full max-w-[25rem]">
                            {children}
                        </div>
                    </div>
                    <div className="absolute bottom-10 text-sm text-typo-disable">
                        Copyright © {APP_NAME.toUpperCase().replace(/ /g, "")}{" "}
                        PLATFORM, {new Date().getFullYear()}
                    </div>
                </div>
            </div>
        </div>
    );
}
