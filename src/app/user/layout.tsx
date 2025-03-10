import Menu from "@/components/shared/header/menu";
import UserMainNav from "@/components/shared/user/main-nav";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import TwoFactorModal from "@/components/shared/auth/2fa";

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <TwoFactorModal />
            <div className="flex flex-col">
                <header className="container mx-auto border-b">
                    <div className="flex h-16 items-center px-4">
                        <Link href="/" className="flex-start">
                            <Image
                                alt={`${APP_NAME} logo`}
                                src="/images/logo.svg"
                                height={48}
                                width={48}
                                priority
                            />
                        </Link>
                        <UserMainNav className="mx-6" />
                        <div className="ml-auto flex items-center space-x-4">
                            <Menu />
                        </div>
                    </div>
                </header>
                <div className="container mx-auto flex-1 space-y-4 p-8 pt-6">
                    {children}
                </div>
            </div>
        </>
    );
}
