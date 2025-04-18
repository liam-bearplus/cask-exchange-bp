import { TMenuNavigation } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
type TProp = {
    isNavigationMenu?: boolean;
} & TMenuNavigation &
    PropsWithChildren;

export default function MenuItem(props: TProp) {
    const { title, subItems, isNavigationMenu, href, children, isOpenWindow } =
        props;
    return (
        <div className="after:contents-[''] group relative text-typo-dark-body after:absolute after:left-0 after:top-full after:w-full after:pb-8 hover:text-typo-brand">
            {children ? (
                children
            ) : isNavigationMenu && href ? (
                <Link
                    className="flex cursor-pointer flex-row items-center gap-1 transition-all"
                    {...(isOpenWindow && { target: "_blank" })}
                    href={href}
                >
                    <div className="text-base font-medium">{title}</div>
                    <Image
                        src="/icons/chevon-down.svg"
                        width={32}
                        height={32}
                        alt="arrow-down"
                        className="h-3 w-3 duration-500 group-hover:rotate-180"
                    />
                </Link>
            ) : (
                <div className="flex cursor-pointer flex-row items-center gap-1 transition-all">
                    <div className="text-base font-medium">{title}</div>
                </div>
            )}

            {subItems && (
                <div className="pointer-events-none absolute -left-5 top-[calc(100%+2rem)] min-w-[12.5rem] translate-y-4 rounded-[0.3125rem] bg-bg-main opacity-0 shadow-[0px_0.5rem_1.5rem_0px_rgba(149,157,165,0.2)] duration-500 ease-in-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="absolute bottom-[calc(100%-0.1px)] left-[1.875rem] w-[1.125rem]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            viewBox="0 0 18 9"
                            fill="none"
                        >
                            <path
                                d="M9.12988 0.396606L17.7901 9.39661H0.469628L9.12988 0.396606Z"
                                fill="white"
                            />
                        </svg>
                    </div>

                    <ul className="flex flex-col overflow-hidden rounded-[0.3125rem]">
                        {subItems.map((subItem) => (
                            <ListItem
                                key={subItem.title}
                                title={subItem.title}
                                href={subItem.href}
                                onClick={subItem?.onClick}
                                icon={subItem?.icon}
                                isOpenWindow={subItem?.isOpenWindow}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

const ListItem = ({
    title,
    icon,
    onClick,
    isOpenWindow,
    href,
}: NonNullable<TMenuNavigation["subItems"]>[number]) => {
    const pathname = usePathname();
    const isActive = href === pathname;
    return (
        <li
            className={cn(
                "cursor-pointer px-3 py-2.5 hover:bg-bg-sf1",
                isActive && "bg-bg-sf1"
            )}
            onClick={onClick}
        >
            {href ? (
                <Link
                    href={href}
                    {...(isOpenWindow && { target: "_blank" })}
                    className={cn(
                        "flex flex-row items-center gap-2 text-sm font-medium leading-none text-typo-body"
                    )}
                >
                    {icon && <div>{icon()}</div>} {title}
                </Link>
            ) : (
                <div
                    className={cn(
                        "flex flex-row items-center gap-2 text-sm font-medium leading-none text-typo-body"
                    )}
                >
                    {icon && <div>{icon()}</div>} {title}
                </div>
            )}
        </li>
    );
};
ListItem.displayName = "ListItem";
