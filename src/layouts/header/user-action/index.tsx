"use client";

import { IconBell } from "@/components/shared/icons/icon-bell";
import IconLogout from "@/components/shared/icons/icon-logout";
import IconSetting from "@/components/shared/icons/icon-settings";
import IconStar from "@/components/shared/icons/icon-start";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import authService from "@/services/auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function UserAction() {
    const { data: session } = useSession();
    return (
        <div className="flex-1">
            <div className="flex-center flex gap-2">
                <Button size="icon" variant="empty" className="!p-2.5">
                    <div className="relative">
                        <IconBell className="h-5 w-5 text-typo-dark-primary" />
                        <div className="top absolute -right-[0.125rem] -top-[0.125rem] h-2 w-2 rounded-full bg-success"></div>
                    </div>
                </Button>
                <Button
                    variant={"empty"}
                    className="!min-w-max p-4 text-typo-dark-primary [&:hover]:text-brand [&:hover_path]:fill-brand [&_path]:fill-transparent [&_path]:transition-all [&_path]:duration-500"
                >
                    <div className="h-5 w-5">
                        <IconStar />
                    </div>
                </Button>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button
                            size="icon"
                            variant={"icon"}
                            className="relative"
                        >
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
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="shadow-[0px_0.5rem_1.5rem_0px_rgba(149, 157, 165, 0.20)] min-w-[12.5rem] p-0">
                        <DropdownMenuItem>
                            <div className="h-4 w-4">
                                <IconSetting />
                            </div>
                            <div className="text-sm font-medium text-typo-body">
                                Settings
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={async () => {
                                await authService.signOut();
                                signOut();
                            }}
                        >
                            <div className="h-4 w-4">
                                <IconLogout />
                            </div>
                            <div className="text-sm font-medium text-typo-body">
                                Log out
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
