import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormMessage,
    FormRootError,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDisableButtonForm } from "@/hooks/useDisableButtonForm";
import { resendVerifyUser } from "@/lib/constants";
import { KEY_RESEND_EMAIL } from "@/lib/constants/key";
import { resendVerifyUserSchema } from "@/lib/validators";
import authService from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Dispatch } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function CredentialsResendVerifyEmail({
    setIsChangeValue,
}: {
    setIsChangeValue?: Dispatch<React.SetStateAction<boolean>>;
}) {
    const resendEmailMutation = useMutation({
        mutationFn: authService.resendEmailVerification,
        gcTime: Infinity,
        mutationKey: [KEY_RESEND_EMAIL],
    });
    const form = useForm({
        resolver: zodResolver(resendVerifyUserSchema),
        defaultValues: resendVerifyUser,
    });
    const isDisabled = useDisableButtonForm(form);
    const onSubmit = async (data: z.infer<typeof resendVerifyUserSchema>) => {
        try {
            await resendEmailMutation.mutateAsync(data.email);
        } catch (error) {
            form.setError("root", {
                type: "manual",
                message:
                    (error as { message?: string })?.message ||
                    "Something went wrong",
            });
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                onChange={() => {
                    form.clearErrors("root");
                    setIsChangeValue?.(true);
                }}
            >
                <div className="flex flex-col items-center space-y-6">
                    <div className="w-full space-y-4">
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Enter your email"
                                        />
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <FormRootError />
                    </div>
                    <Button
                        disabled={isDisabled || form.formState.isSubmitting}
                        type="submit"
                    >
                        Resend Email
                    </Button>
                </div>
            </form>
        </Form>
    );
}
