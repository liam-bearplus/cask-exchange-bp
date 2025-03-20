"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormMessage,
    FormRootError,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDisableButtonForm } from "@/hooks/useDisableButtonForm";
import { UpdatePasswordDefaultValues } from "@/lib/constants";
import { KEY_RESET_PASSWORD } from "@/lib/constants/key";
import { updatePasswordFormSchema } from "@/lib/validators";
import authService from "@/services/auth";
import { TUpdatePassword } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import PasswordStrength from "./password-strength";

const CredentialsResetPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const form = useForm({
        resolver: zodResolver(updatePasswordFormSchema),
        defaultValues: UpdatePasswordDefaultValues,
    });

    const isDisableButton = useDisableButtonForm(form);

    const resetPasswordMutation = useMutation({
        mutationKey: [KEY_RESET_PASSWORD],
        mutationFn: authService.resetPassword,
        gcTime: Infinity,
    });
    const onSubmit = async (data: TUpdatePassword) => {
        const params = {
            token: token || "",
            password: data.newPassword,
        };
        try {
            await resetPasswordMutation.mutateAsync(params);
        } catch (error) {
            form.setError("root", {
                type: "manual",
                message:
                    (error as { message?: string })?.message ||
                    "Something went wrong",
            });
        }
    };

    const UpdatePasswordButton = () => {
        return (
            <Button
                disabled={isDisableButton || form.formState.isSubmitting}
                className="w-full"
                variant="secondary"
                type="submit"
            >
                {form.formState.isSubmitting ? "Submitting..." : "Done"}
            </Button>
        );
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                id="update-password"
                onChange={() => form.clearErrors("root")}
            >
                <div className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <div className="space-y-1.5">
                                    <Label htmlFor="newPassword">
                                        New password
                                    </Label>
                                    <FormControl>
                                        <Input
                                            id="newPassword"
                                            type="password"
                                            variant="password"
                                            required
                                            autoComplete="off"
                                            placeholder="•••••••••"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <div className="space-y-1.5">
                                    <Label htmlFor="confirmPassword">
                                        Confirm new password
                                    </Label>
                                    <FormControl>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            variant="password"
                                            required
                                            autoComplete="off"
                                            placeholder="•••••••••"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <PasswordStrength password={field.value} />
                                </div>
                            )}
                        />
                        <FormRootError />
                    </div>
                    <div>
                        <UpdatePasswordButton />
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default CredentialsResetPasswordForm;
