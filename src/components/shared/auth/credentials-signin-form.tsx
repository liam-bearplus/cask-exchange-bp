"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormMessage,
    FormRootError,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { useDisableButtonForm } from "@/hooks/useDisableButtonForm";
import { signInDefaultValues } from "@/lib/constants";
import { signInFormSchema } from "@/lib/validators";
import { TLoginUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { ROUTE_AUTH } from "@/lib/constants/route";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const CredentialsSignInForm = () => {
    const { setValue: setRememberLS, getValue: getRememberLS } =
        useLocalStorage({
            key: "rememberMe",
            defaultValue: false,
        });
    const { setValue: setEmailLS, getValue: getEmailLS } = useLocalStorage({
        key: "email",
        defaultValue: "",
    });

    const form = useForm({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            ...signInDefaultValues,
            rememberMe: getRememberLS(),
            email: getEmailLS(),
        },
    });

    const isDisableButton = useDisableButtonForm(form);

    const onSubmit = async (data: TLoginUser) => {
        const result = await signIn("login", {
            ...data,
            redirect: false,
        });

        if (result?.status === 401) {
            form.setError("root", {
                type: "manual",
                message: result?.error || "Invalid email or password",
            });
        } else if (result?.status === 200 || result?.status === 201) {
            setRememberLS(!!data?.rememberMe);
            setEmailLS(data?.email);
            redirect("/");
        }
    };

    const SignInButton = () => {
        return (
            <Button
                disabled={isDisableButton || form.formState.isSubmitting}
                className="w-full"
                variant="default"
                type="submit"
            >
                {form.formState.isSubmitting ? "Logging In..." : "Login"}
            </Button>
        );
    };

    return (
        <ErrorBoundary errorComponent={() => <FormRootError />}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    id="sign-in"
                    onChange={() => form.clearErrors("root")}
                >
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
                                                type="text"
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
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
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
                            <FormRootError />
                            <FormField
                                name="rememberMe"
                                control={form.control}
                                render={({ field }) => {
                                    return (
                                        <div className="flex items-center justify-between">
                                            <FormControl>
                                                <div className="flex content-start items-start space-x-2">
                                                    <Checkbox
                                                        id="remember"
                                                        className="mt-0.5"
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                    <Label htmlFor="remember">
                                                        Remember me
                                                    </Label>
                                                </div>
                                            </FormControl>
                                            <Link
                                                href={
                                                    ROUTE_AUTH.FORGOT_PASSWORD
                                                }
                                                target="_self"
                                                className="text-underline text-base text-typo-body"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>
                                    );
                                }}
                            />
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
        </ErrorBoundary>
    );
};

export default CredentialsSignInForm;
