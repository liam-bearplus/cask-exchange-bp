import { Button } from "@/components/ui/button";
import { SidebarFooter, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import React from "react";

export default function SideBarFooter({ className }: { className: string }) {
    const { setOpen } = useSidebar();
    return (
        <SidebarFooter className={cn("bg-bg-main", className)}>
            <div className="flex flex-row items-center justify-center gap-3 px-6 py-4">
                <Button
                    variant={"primary"}
                    type="submit"
                    className="flex-1"
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    Apply
                </Button>
                <Button
                    type="button"
                    variant={"outline"}
                    className="flex-1"
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </Button>
            </div>
        </SidebarFooter>
    );
}
