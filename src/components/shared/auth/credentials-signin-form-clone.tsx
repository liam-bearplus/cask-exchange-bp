"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInDefaultValues } from "@/lib/constants";
import { signInFormSchema } from "@/lib/validators";
import { loginUser } from "@/services/auth";
import { TLoginUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

const CredentialsSignInForm = () => {
    const loginMutation = useMutation({
        mutationKey: ["login"],
        mutationFn: ({ data: data }: { data: TLoginUser }) => loginUser(data),
    });
    const onSubmit = (data: TLoginUser) => {
        console.log("data", data);
        loginMutation.mutate(
            { data },
            {
                onSuccess: () => {
                    signIn("login", {
                        ...data,
                        redirect: true,
                        callbackUrl: "/",
                    });
                },
            }
        );
    };

    const form = useForm({
        resolver: zodResolver(signInFormSchema),
        defaultValues: signInDefaultValues,
    });

    const isDisabled = useCallback(() => {
        const values = form.getValues();
        return Object.values(values).every(
            (value) => value !== undefined && value !== "" && value !== null
        );
    }, [form.getValues]);

    const SignInButton = () => {
        return (
            <Button
                disabled={!isDisabled() || loginMutation.isPending}
                className="w-full"
                variant="default"
            >
                {loginMutation.isPending ? "Signing In..." : "Sign In"}
            </Button>
        );
    };
    const isDisable = form;
    console.log("isDisable", isDisable);
    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="text" {...field} />
                            <FormMessage />
                        </div>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" {...field} />
                            <FormMessage />
                        </div>
                    )}
                />
                <div>
                    <SignInButton />
                </div>
                <div className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/sign-up"
                        target="_self"
                        className="text-primary underline"
                    >
                        Sign up
                    </Link>
                    instead.
                </div>
            </form>
        </Form>
    );
};

export default CredentialsSignInForm;
