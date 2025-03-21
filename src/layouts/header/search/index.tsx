"use client";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { searchSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Search() {
    const form = useForm({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            search: "",
        },
    });
    const onSubmit = (data: z.infer<typeof searchSchema>) => {
        console.log("data", data);
    };

    return (
        <div className="w w-[calc(576 /1604 * 100%] h-10 w-full max-w-[36rem]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name="search"
                        control={form.control}
                        render={({ field }) => {
                            return (
                                <FormControl className="relative">
                                    <div>
                                        <Input
                                            {...field}
                                            id="search"
                                            type="text"
                                            placeholder="Search for a cask"
                                            className="input-dark pr-9"
                                        />
                                        <div className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2">
                                            <Image
                                                src={"/icons/search-icon.svg"}
                                                width={32}
                                                alt="Search ic"
                                                height={32}
                                            />
                                        </div>
                                    </div>
                                </FormControl>
                            );
                        }}
                    />
                </form>
            </Form>
        </div>
    );
}
