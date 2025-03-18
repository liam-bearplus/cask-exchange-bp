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
import { Separator } from "@/components/ui/separator";

import { PhoneInput } from "@/components/ui/phone-input";
import { useDisableButtonForm } from "@/hooks/useDisableButtonForm";
import { signUpDefaultValues } from "@/lib/constants";
import { KEY_SIGNUP } from "@/lib/constants/key";
import { signUpFormSchema } from "@/lib/validators";
import authService from "@/services/auth";
import { TRegisterUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";
import PasswordStrength from "./password-strength";
import { ROUTE_AUTH } from "@/lib/constants/route";

const CredentialsSignUpForm = () => {
    const registrationMutation = useMutation({
        mutationKey: [KEY_SIGNUP],
        mutationFn: authService.registerUser,
        gcTime: Infinity,
    });
    const form = useForm({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: signUpDefaultValues,
    });

    const onSubmit = async (data: TRegisterUser) => {
        try {
            await registrationMutation.mutateAsync(data);
        } catch (error) {
            form.setError("root", {
                type: "manual",
                message:
                    (error as { message?: string })?.message ||
                    "Something went wrong",
            });
        }
    };

    const isDisableButton = useDisableButtonForm(form, ["inviteCode"]);

    const SignUpButton = () => {
        return (
            <Button
                disabled={isDisableButton || form.formState.isSubmitting}
                className="w-full"
                variant="default"
                type="submit"
            >
                {form.formState.isSubmitting
                    ? "Submitting..."
                    : "Create new account"}
            </Button>
        );
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                id="sign-up"
                onChange={() => form.clearErrors("root")}
            >
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-x-3 gap-y-4">
                        <FormField
                            name="firstName"
                            control={form.control}
                            render={({ field }) => (
                                <div className="space-y-1.5">
                                    <Label htmlFor="firstName">
                                        First name
                                    </Label>
                                    <FormControl>
                                        <Input
                                            id="firstName"
                                            type="text"
                                            required
                                            autoComplete="given-name"
                                            placeholder="Ex: John"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            )}
                        />
                        <FormField
                            name="lastName"
                            control={form.control}
                            render={({ field }) => (
                                <div className="space-y-1.5">
                                    <Label htmlFor="lastName">Last name</Label>
                                    <FormControl>
                                        <Input
                                            id="lastName"
                                            type="text"
                                            required
                                            autoComplete="family-name"
                                            placeholder="Ex: Doe"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            )}
                        />
                        <FormField
                            name="phoneNumber"
                            control={form.control}
                            render={({ field }) => (
                                <div className="space-y-1.5">
                                    <Label htmlFor="phoneNumber">Phone</Label>
                                    <FormControl>
                                        <PhoneInput
                                            id="phoneNumber"
                                            type="text"
                                            required
                                            autoComplete="tel"
                                            defaultCountry="US"
                                            international={true}
                                            placeholder="000-000-000"
                                            className="shadow-sm"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            )}
                        />
                        <FormField
                            name="inviteCode"
                            control={form.control}
                            render={({ field }) => (
                                <div className="space-y-1.5">
                                    <Label htmlFor="inviteCode">
                                        Invite code
                                    </Label>
                                    <FormControl>
                                        <Input
                                            id="inviteCode"
                                            type="text"
                                            autoComplete="off"
                                            placeholder="Invite code"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            )}
                        />
                    </div>
                    <Separator />
                    <div className="space-y-4">
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <div className="space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            type="text"
                                            required
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
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <div className="space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <FormControl>
                                        <Input
                                            id="password"
                                            type="password"
                                            variant="password"
                                            required
                                            autoComplete="password"
                                            placeholder="•••••••••"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <PasswordStrength password={field.value} />
                                </div>
                            )}
                        />
                    </div>
                    <FormField
                        name="consent"
                        control={form.control}
                        render={({ field }) => (
                            <div className="space-y-1.5">
                                <div className="flex content-start items-start space-x-2">
                                    <FormControl>
                                        <Checkbox
                                            id="consent"
                                            className="mt-0.5"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <Label
                                        htmlFor="consent"
                                        className="font-normal text-typo-disable"
                                    >
                                        I have read and agree to the{" "}
                                        <Link
                                            href="#"
                                            target="_blank"
                                            className="text-underline text-typo-body"
                                        >
                                            Terms of Service
                                        </Link>{" "}
                                        and{" "}
                                        <Link
                                            href="#"
                                            target="_blank"
                                            className="text-underline text-typo-body"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </Label>
                                </div>
                                <FormMessage />
                            </div>
                        )}
                    />
                    <FormRootError />
                    <div>
                        <SignUpButton />
                    </div>
                    <div className="text-center text-base text-typo-disable">
                        Already have an account?{" "}
                        <Link
                            href={ROUTE_AUTH.LOGIN}
                            target="_self"
                            className="text-underline text-typo-body"
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default CredentialsSignUpForm;
