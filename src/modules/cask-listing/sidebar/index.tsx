import IconClose from "@/components/shared/icons/icon-close";
import IconSidebar from "@/components/shared/icons/icon-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    useSidebar,
} from "@/components/ui/sidebar";
import useClickOutSide from "@/hooks/useClickOutSide";
import { useBoundStore } from "@/store";
import { useRef } from "react";
import FormFilter from "../filter";

export function SideBarCaskListing() {
    const { setOpen } = useSidebar();
    const { setIsCancel } = useBoundStore();
    const wrapSidebarRef = useRef<HTMLDivElement | null>(null);
    useClickOutSide(() => {
        setOpen(false);
        setIsCancel(true);
    }, wrapSidebarRef);
    return (
        <Sidebar ref={wrapSidebarRef}>
            <SidebarHeader>
                <div className="w-full bg-bg-sf1 px-6 py-4">
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex w-full flex-row items-center gap-4">
                            <div className="rounded-full border border-bd-main p-2.5">
                                <div className="h-4 w-4 text-typo-body">
                                    <IconSidebar />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-typo-primary">
                                Filters
                            </h3>
                        </div>
                        <div
                            className="cursor-pointer p-2"
                            onClick={() => setOpen(false)}
                        >
                            <div className="h-5 w-5">
                                <IconClose />
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent ref={wrapSidebarRef} className="h-full">
                <ScrollArea>
                    <SidebarGroup className="px-6">
                        <FormFilter />
                    </SidebarGroup>
                </ScrollArea>
            </SidebarContent>
        </Sidebar>
    );
}
