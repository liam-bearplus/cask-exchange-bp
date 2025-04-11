"use client";

import { MENU_NAVIGATION } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as React from "react";

export function Menu() {
    return (
        <div className="flex w-full flex-row items-center gap-8">
            {MENU_NAVIGATION.map((item) => {
                const isNavigationMenu =
                    item?.subItems && item?.subItems?.length > 0;
                const NavTrigger = isNavigationMenu ? "a" : "div";
                return (
                    <div
                        key={item.title}
                        className="after:contents-[''] group relative after:absolute after:w-full after:pb-8"
                    >
                        <NavTrigger className="flex cursor-pointer flex-row items-center gap-1 text-typo-dark-body">
                            <div>{item.title}</div>
                            {isNavigationMenu && (
                                <Image
                                    src="/icons/chevon-down.svg"
                                    width={32}
                                    height={32}
                                    alt="arrow-down"
                                    className="h-3 w-3 duration-500 group-hover:rotate-180"
                                />
                            )}
                        </NavTrigger>
                        {item.subItems && (
                            <div className="pointer-events-none absolute -left-5 top-[calc(100%+2rem)] min-w-[12.5rem] translate-y-4 rounded-[0.3125rem] bg-bg-main opacity-0 shadow-[0px_0.5rem_1.5rem_0px_rgba(149,157,165,0.2)] duration-500 ease-in-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                                <div className="absolute bottom-full left-[1.875rem] w-[1.125rem]">
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
                                    {item.subItems.map((subItem) => (
                                        <ListItem
                                            key={subItem.title}
                                            title={subItem.title}
                                            href={subItem.href}
                                        />
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ title, ...props }, ref) => {
    const pathname = usePathname();
    const isActive = props.href === pathname;
    return (
        <li
            className={cn(
                "cursor-pointer px-3 py-2.5 hover:bg-bg-sf1",
                isActive && "bg-bg-sf1"
            )}
        >
            <a
                ref={ref}
                {...props}
                className={cn(
                    "text-sm font-medium leading-none text-typo-body"
                )}
            >
                {title}
            </a>
        </li>
    );
});
ListItem.displayName = "ListItem";
