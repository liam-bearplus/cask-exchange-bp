"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect, useSearchParams } from "next/navigation";
import Banner from "./banner";
import Content from "./content";
import { SideBarCaskListing } from "./sidebar";

export default function CaskListingModule() {
    const search = useSearchParams();
    const type = search.get("type");
    if (!type) {
        redirect("/not-found");
    }
    return (
        <SidebarProvider>
            <div className="mt-[5.5rem] w-full">
                <SideBarCaskListing />
                <Banner />
                <Content />
            </div>
        </SidebarProvider>
    );
}
