import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MENU_NAVIGATIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";

export function Menu() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {MENU_NAVIGATIONS.map((item) => {
                    const isNavigationMenu =
                        item?.subItems && item?.subItems?.length > 0;
                    const NavTrigger = isNavigationMenu
                        ? NavigationMenuTrigger
                        : NavigationMenuLink;
                    return (
                        <NavigationMenuItem key={item.title}>
                            <NavTrigger href={item.href}>
                                {item.icon && (
                                    <Image
                                        src={item.icon}
                                        width={16}
                                        height={16}
                                        alt="Cask Icon"
                                        className="mr-1 h-4 w-4"
                                    />
                                )}
                                {item.title}
                            </NavTrigger>
                            {item.subItems && (
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {item.subItems.map((subItem) => (
                                            <ListItem
                                                key={subItem.title}
                                                title={subItem.title}
                                                href={subItem.href}
                                            ></ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            )}
                        </NavigationMenuItem>
                    );
                })}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
