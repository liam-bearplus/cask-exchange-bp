"use client";

// import CaskCardItem from "@/components/shared/cask-card";
import FormFilter from "./filter";
import CaskList from "./list";

export default function ListModule() {
    return (
        <div className="pt-12">
            <div className="container">
                <div className="relative grid grid-cols-16 gap-7">
                    <CaskList />
                    <FormFilter />
                </div>
            </div>
        </div>
    );
}
