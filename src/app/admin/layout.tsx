import AdminMainNav from "@/components/shared/admin/main-nav";
import Menu from "@/components/shared/header/menu";
import { Input } from "@/components/ui/input";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export default function AdminLayout({
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
                            <Image
                                alt={`${APP_NAME} logo`}
                                src="/images/logo.svg"
                                height={48}
                                width={48}
                                priority
                            />
                        </Link>
                        <AdminMainNav className="mx-6" />
                        <div className="ml-auto flex items-center space-x-4">
                            <div>
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    className="md:w-[100px] lg:w-[300px]"
                                />
                            </div>
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
