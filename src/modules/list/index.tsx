"use client";

// import CaskCardItem from "@/components/shared/cask-card";
import FormFilter from "./filter";
import CaskList from "./list";
import { SortFilter } from "./sort";

export default function ListModule() {
    return (
        <div className="mt-40">
            <div className="container">
                <div className="relative grid grid-cols-16 gap-7">
                    <SortFilter />
                    <CaskList />
                    <FormFilter />
                </div>
            </div>
        </div>
    );
}
