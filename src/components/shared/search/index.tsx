"use client";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { searchSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import IconSearch from "../icons/icon-search";

type TSearchProps = {
    className?: string;
    placeholder?: string;
    onChange?: () => void;
    onSubmit?: (value?: string) => void;
};

export default function Search(props: TSearchProps) {
    const {
        className,
        placeholder = "Search for anything",
        onChange,
        onSubmit,
    } = props;

    const form = useForm({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            search: "",
        },
    });
    const onSubmitForm = (data: z.infer<typeof searchSchema>) => {
        if (onSubmit) {
            onSubmit(data?.search);
        }
    };

    return (
        <div className={cn("h-10 w-full min-w-64", className)}>
            <Form {...form}>
                <form
                    onChange={() => {
                        onChange?.();
                    }}
                    onSubmit={form.handleSubmit(onSubmitForm)}
                >
                    <FormField
                        name="search"
                        control={form.control}
                        render={({ field }) => {
                            return (
                                <FormControl className="relative">
                                    <div>
                                        <div className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-typo-dark-disable">
                                            <IconSearch />
                                        </div>
                                        <Input
                                            {...field}
                                            id="search"
                                            type="text"
                                            placeholder={placeholder}
                                            className="rounded-md pl-9"
                                        />
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
