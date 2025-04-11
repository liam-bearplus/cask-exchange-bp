"use client";

import { IconBell } from "@/components/shared/icons/icon-bell";
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
                <Button size="icon" variant="empty">
                    <div className="relative">
                        <IconBell className="h-4 w-4 text-typo-dark-primary" />
                        <div className="top absolute -right-[0.125rem] -top-[0.125rem] h-2 w-2 rounded-full bg-success"></div>
                    </div>
                </Button>
                <Button
                    variant={"empty"}
                    className="!min-w-max p-4 text-typo-dark-primary [&:hover]:text-brand [&:hover_path]:fill-brand [&_path]:fill-transparent [&_path]:transition-all [&_path]:duration-500"
                >
                    <div className="h-4 w-4">
                        <IconStar />
                    </div>
                </Button>
                <DropdownMenu>
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
                            <div className="absolute -bottom-[0.1rem] -right-[0.1rem] h-[0.8125rem] w-[0.8125rem] overflow-hidden rounded-full border-[0.1rem] border-solid border-white-main bg-success" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-32">
                        <DropdownMenuItem
                            onClick={async () => {
                                await authService.signOut();
                                signOut();
                            }}
                        >
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
