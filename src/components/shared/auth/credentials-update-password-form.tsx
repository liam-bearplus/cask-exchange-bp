"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDisableButtonForm } from "@/hooks/useDisableButtonForm";
import { UpdatePasswordDefaultValues } from "@/lib/constants";
import { KEY_UPDATE_PASSWORD } from "@/lib/constants/key";
import { updatePasswordFormSchema } from "@/lib/validators";
import { updatePassword } from "@/services/auth";
import { TUpdatePassword } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const CredentialsUpdatePasswordForm = () => {
    const updatePasswordMutation = useMutation({
        mutationKey: [KEY_UPDATE_PASSWORD],
        mutationFn: ({ data: data }: { data: TUpdatePassword }) =>
            updatePassword(data),
    });
    const onSubmit = (data: TUpdatePassword) => {
        updatePasswordMutation.mutate({ data });
    };

    const form = useForm({
        resolver: zodResolver(updatePasswordFormSchema),
        defaultValues: UpdatePasswordDefaultValues,
    });

    const isDisableButton = useDisableButtonForm(form);

    const UpdatePasswordButton = () => {
        return (
            <Button
                disabled={isDisableButton || updatePasswordMutation.isPending}
                className="w-full"
                variant="default"
                type="submit"
            >
                {updatePasswordMutation.isPending ? "Submitting..." : "Done"}
            </Button>
        );
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} id="update-password">
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
                                </div>
                            )}
                        />
                    </div>
                    <div>
                        <UpdatePasswordButton />
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default CredentialsUpdatePasswordForm;
