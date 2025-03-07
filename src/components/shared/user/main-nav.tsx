"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    {
        title: "Profile",
        href: "/user/profile",
    },
    {
        title: "Orders",
        href: "/user/orders",
    },
];

const UserMainNav = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) => {
    const pathname = usePathname();
    return (
        <nav
            className={cn(
                "flex items-center space-x-4 lg:space-x-6",
                className
            )}
            {...props}
        >
            {links.map((link) => (
                <Link
                    key={link.title}
                    href={link.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname.includes(link.href)
                            ? ""
                            : "text-muted-foreground"
                    )}
                >
                    {link.title}
                </Link>
            ))}
        </nav>
    );
};

export default UserMainNav;
