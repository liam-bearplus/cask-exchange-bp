"use client";

import { MENU_NAVIGATION } from "@/lib/constants";
import MenuItem from "./menu-item";

export function Menu() {
    return (
        <div className="flex w-full flex-row items-center gap-8">
            {MENU_NAVIGATION.map((item) => {
                const isNavigationMenu =
                    item?.subItems && item?.subItems?.length > 0;
                return (
                    <MenuItem
                        key={item.title}
                        {...item}
                        isNavigationMenu={isNavigationMenu}
                    />
                );
            })}
        </div>
    );
}
