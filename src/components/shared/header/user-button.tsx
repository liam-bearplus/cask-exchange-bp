import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { UserIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

const UserButton = async () => {
    const session = await getServerSession();
    if (!session)
        return (
            <Button asChild>
                <Link href="/sign-in">
                    <UserIcon />
                    Sign in
                </Link>
            </Button>
        );

    const firstInitial = session?.user
        ? session.user.name?.charAt(0).toUpperCase()
        : "U";

    return (
        <div className="flex items-center gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center">
                        <Button
                            variant={"ghost"}
                            className="bg-gray-200 relative ml-2 flex h-8 w-8 items-center justify-center rounded-full"
                        >
                            {firstInitial}
                        </Button>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <div className="text-sm font-medium leading-none">
                                {session?.user?.name ?? ""}
                            </div>
                            <div className="text-sm leading-none text-muted-foreground">
                                {session?.user?.email ?? ""}
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuItem className="mb-1 p-0">
                        <Link href="/user/profile" className="w-full">
                            <Button
                                className="h-4 w-full justify-start px-2 py-4"
                                variant={"ghost"}
                            >
                                Profile
                            </Button>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="mb-1 p-0">
                        <Link href="/user/orders" className="w-full">
                            <Button
                                className="h-4 w-full justify-start px-2 py-4"
                                variant={"ghost"}
                            >
                                Order History
                            </Button>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="mb-1 p-0" asChild>
                        {/* //TODO: Signout <form action={signOutUser} className="w-full">
              <Button
                className="w-full py-4 px-2 h-4 justify-start"
                variant={"ghost"}
              >
                Sign Out
              </Button>
            </form> */}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default UserButton;
