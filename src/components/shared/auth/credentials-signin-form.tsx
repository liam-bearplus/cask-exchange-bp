"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Form,
    FormControl,
    FormField,
    FormMessage,
} from "@/components/ui/form";

import { useDisableButtonForm } from "@/hooks/useDisableButtonForm";
import { signInDefaultValues } from "@/lib/constants";
import { signInFormSchema } from "@/lib/validators";
import { loginUser } from "@/services/auth";
import { TLoginUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

const CredentialsSignInForm = () => {
    const loginMutation = useMutation({
        mutationKey: ["login"],
        mutationFn: ({ data: data }: { data: TLoginUser }) => loginUser(data),
    });
    const onSubmit = (data: TLoginUser) => {
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
                // onError: (error) => {
                //   console.log("error", error);
                // },
            }
        );
    };

    const form = useForm({
        resolver: zodResolver(signInFormSchema),
        defaultValues: signInDefaultValues,
    });

    const isDisableButton = useDisableButtonForm(form);

    const SignInButton = () => {
        return (
            <Button
                disabled={isDisableButton || loginMutation.isPending}
                className="w-full"
                variant="default"
                type="submit"
            >
                {loginMutation.isPending ? "Logging In..." : "Login"}
            </Button>
        );
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} id="sign-in">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <div className="space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            type="email"
                                            autoComplete="email"
                                            placeholder="Ex: johndoe@gmail.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <div className="space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <FormControl>
                                        <Input
                                            id="password"
                                            type="password"
                                            variant="password"
                                            autoComplete="password"
                                            placeholder="•••••••••"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            )}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex content-start items-start space-x-2">
                            <Checkbox id="remember" className="mt-0.5" />
                            <Label htmlFor="remember">Remember me</Label>
                        </div>
                        <Link
                            href="/reset-password"
                            target="_self"
                            className="text-underline text-base text-typo-body"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <div>
                        <SignInButton />
                    </div>
                    <div className="text-center text-base text-typo-disable">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/sign-up"
                            target="_self"
                            className="text-underline text-typo-body"
                        >
                            Sign up
                        </Link>{" "}
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default CredentialsSignInForm;
