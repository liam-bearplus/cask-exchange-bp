"use client";

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
import { ChevronsUpDown } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

export default function FilterList({
    filterList,
    setParams,
}: {
    filterList: any;
    setParams: Dispatch<SetStateAction<string>>;
}) {
    const [open, setOpen] = React.useState(false);
    return (
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
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup
                            onChange={(data) => {
                                console.log("data", data);
                            }}
                        >
                            {Object.keys(filterList)?.map((framework) => (
                                <CommandItem key={framework} value={framework}>
                                    <Checkbox
                                        id={framework}
                                        value={framework}
                                    />
                                    <LabelSimple htmlFor={framework}>
                                        {framework
                                            .split("-")
                                            .join(" ")
                                            .toLocaleUpperCase()}
                                    </LabelSimple>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
