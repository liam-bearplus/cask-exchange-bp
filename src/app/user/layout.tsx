import ImagePlaceholder from "@/components/shared/image-placeholder";
import UserMainNav from "@/components/shared/user/main-nav";
import { APP_NAME } from "@/lib/constants";
import Link from "next/link";

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex flex-col">
                <header className="container mx-auto border-b">
                    <div className="flex h-16 items-center px-4">
                        <Link href="/" className="flex-start">
                            <ImagePlaceholder
                                alt={`${APP_NAME} logo`}
                                src="/icons/logo.svg"
                                height={48}
                                width={48}
                                priority
                            />
                        </Link>
                        <UserMainNav className="mx-6" />
                        <div className="ml-auto flex items-center space-x-4"></div>
                    </div>
                </header>
                <div className="container mx-auto flex-1 space-y-4 p-8 pt-6">
                    {children}
                </div>
            </div>
        </>
    );
}
