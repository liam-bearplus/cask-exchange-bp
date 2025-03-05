import SplashScreen from "@/components/shared/auth/splash-screen";
import { APP_NAME } from "@/lib/constants";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full">
        <div className="w-full h-full min-h-screen grid grid-cols-2">
            <SplashScreen />
            <div className="flex-center flex-col py-28 relative">
                <div className="grid grid-cols-12 gap-4 px-5 w-full">
                    <div className="w-full max-w-[25rem] mx-auto col-start-2 -col-end-2">
                        {children}
                    </div>
                </div>
                <div className="text-sm text-typo-disable absolute bottom-10">
                    Copyright © {APP_NAME.toUpperCase().replace(/ /g, '')} PLATFORM, {new Date().getFullYear()}
                </div>
            </div>
        </div>
    </div>
  )
}