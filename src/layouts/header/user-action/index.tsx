"use client";

import { IconBell } from "@/components/shared/icons/icon-bell";
import IconLogout from "@/components/shared/icons/icon-logout";
import IconSetting from "@/components/shared/icons/icon-settings";
import IconStar from "@/components/shared/icons/icon-start";
import { Button } from "@/components/ui/button";
import authService from "@/services/auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import MenuItem from "../menu/menu-item";

export default function UserAction() {
    const { data: session } = useSession();
    return (
        <div className="flex-1">
            <div className="flex-center flex gap-2">
                <Button
                    size="icon"
                    variant="empty"
                    className="rounded-full !p-2.5 hover:bg-bg-dark-sf2"
                >
                    <div className="relative">
                        <IconBell className="h-5 w-5 text-typo-dark-primary transition-all" />
                        <div className="top absolute -right-[0.125rem] -top-[0.125rem] h-2 w-2 rounded-full bg-success"></div>
                    </div>
                </Button>
                <Button
                    variant={"empty"}
                    className="!min-w-max rounded-full !p-2.5 text-typo-dark-primary transition-all hover:bg-bg-dark-sf2"
                >
                    <div className="h-5 w-5">
                        <IconStar />
                    </div>
                </Button>
                <MenuItem
                    isNavigationMenu={false}
                    subItems={[
                        {
                            title: "Settings",
                            icon: () => (
                                <div className="h-4 w-4">
                                    <IconSetting />
                                </div>
                            ),
                        },
                        {
                            title: "Log out",
                            icon: () => (
                                <div className="h-4 w-4">
                                    <IconLogout />
                                </div>
                            ),
                            onClick: async () => {
                                await authService.signOut();
                                signOut();
                            },
                        },
                    ]}
                >
                    <Button size="icon" variant={"icon"} className="relative">
                        <div className="overflow-hidden rounded-full">
                            <Image
                                src={
                                    session?.user?.image ||
                                    "/images/user_placeholder.jpeg"
                                }
                                alt={`${session?.user?.name} avatar`}
                                height={80}
                                width={80}
                            />
                        </div>
                    </Button>
                </MenuItem>
            </div>
        </div>
    );
}
