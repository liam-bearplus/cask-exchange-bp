"use client";

// import CaskCardItem from "@/components/shared/cask-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { LabelSimple } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { ChevronsUpDown } from "lucide-react";
import React from "react";

export default function ListModule() {
    const [open, setOpen] = React.useState(false);
    const searchQuery = useQuery({
        queryKey: ["search"],
        queryFn: () => {
            return fetch("https://api.sampleapis.com/wines/reds").then((res) =>
                res.json()
            );
        },
    });
    const filterList = searchQuery?.data?.reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (acc: { [key: string]: any }, cask: { winery: string }) => {
            const formatCate = cask.winery.split(" ").join("-").toLowerCase();
            if (acc?.[formatCate]) {
                acc[formatCate].push(cask);
            } else {
                acc[formatCate] = [cask];
            }
            return acc;
        },
        {}
    );
    console.log("filterList", filterList);
    return (
        <div className="container">
            <div className="relative grid grid-cols-16 gap-7">
                <div className="sticky top-0 col-start-1 col-end-4 h-max min-h-[50vh] rounded-lg bg-white-900">
                    {filterList && (
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[200px] justify-between"
                                >
                                    Select Wine
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput
                                        placeholder="Search framework..."
                                        className="h-9"
                                    />
                                    <CommandList>
                                        <CommandEmpty>
                                            No framework found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {Object.keys(filterList)?.map(
                                                (framework) => (
                                                    <CommandItem
                                                        key={framework}
                                                        value={framework}
                                                    >
                                                        <Checkbox
                                                            id={framework}
                                                            value={framework}
                                                        />
                                                        <LabelSimple
                                                            htmlFor={framework}
                                                        >
                                                            {framework
                                                                .split("-")
                                                                .join(" ")
                                                                .toLocaleUpperCase()}
                                                        </LabelSimple>
                                                    </CommandItem>
                                                )
                                            )}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
                {/* <div className="col-span-12">
                    <div className="flex flex-row flex-wrap gap-7">
                        {searchQuery?.data &&
                            searchQuery.data.map((cask: any) => {
                                return (
                                    <CaskCardItem
                                        key={cask.id}
                                        data={{
                                            name: cask.name,
                                            imageUrl: cask.image,
                                        }}
                                    />
                                );
                            })}
                    </div>
                </div> */}
            </div>
        </div>
    );
}
