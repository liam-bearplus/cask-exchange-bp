"use client";

import { IconBell } from "@/components/shared/icons/icon-bell";
import { IconHeart } from "@/components/shared/icons/icon-heart";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function UserAction() {
    const { data: session } = useSession();
    return (
        <div className="flex-1">
            <div className="flex-center flex gap-2">
                <Button size="icon" variant="icon">
                    <div className="relative">
                        <IconBell className="h-4 w-4" />
                        <div className="top absolute -right-[0.125rem] -top-[0.125rem] h-2 w-2 rounded-full bg-success"></div>
                    </div>
                </Button>
                <Button size="icon" variant="icon">
                    <div className="relative">
                        <IconHeart className="h-4 w-4" />
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
                            <div className="border-white-main absolute -bottom-[0.1rem] -right-[0.1rem] h-[0.8125rem] w-[0.8125rem] overflow-hidden rounded-full border-[0.1rem] border-solid bg-success" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-32">
                        <DropdownMenuItem
                            onClick={() => {
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
