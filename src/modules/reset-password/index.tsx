"use client";

import AuthStatus from "@/components/shared/auth/auth-status";
import CredentialsHead from "@/components/shared/auth/credentials-head";
import CredentialsResetPasswordForm from "@/components/shared/auth/credentials-update-password-form";
import useGetMutationState from "@/hooks/useGetMutationState";
import { TIMER_RESEND_SECONDS } from "@/lib/constants";
import {
    KEY_CHECK_RESET_PASSWORD,
    KEY_FORGOT_PASSWORD,
    KEY_RESET_PASSWORD,
} from "@/lib/constants/key";
import { ROUTE_AUTH } from "@/lib/constants/route";
import authService from "@/services/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { redirect, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function ResetPasswordModule() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    // State and Refs
    const [timerResend, setTimerResend] = useState(TIMER_RESEND_SECONDS);
    const timeResendRef = useRef<NodeJS.Timeout | null>(null);
    const [isSuccessResend, setIsLoadedResend] = useState<boolean>(false);

    // Data Fetching
    const resendForgotPassword = useMutation({
        mutationFn: authService.forgotPassword,
        mutationKey: [KEY_FORGOT_PASSWORD],
    });

    const resetPasswordMutation = useGetMutationState({
        key: KEY_RESET_PASSWORD,
    });

    const validToken = useQuery({
        queryKey: [KEY_CHECK_RESET_PASSWORD],
        queryFn: () =>
            authService.verifyTokenResetPassword({ token: token as string }),
        retry: false,
        enabled: !!token,
    });

    // Schema Configuration
    const schema = {
        success: {
            title: "Password Reset Successfully",
            description: "Log in to your account with your new password.",
            buttonText: "Login now",
            action: () => redirect(ROUTE_AUTH.SIGNIN),
            isShowSignin: false,
            isDisableButton: false,
            messageError: "",
        },
        pending: {
            title: "Account Verifying...",
            description:
                "We're confirming your details. This might take a moment.",
            buttonText: "Verifying...",
            action: () => {},
            isShowSignin: false,
            isDisableButton: true,
            messageError: "",
        },
        error: {
            title: "Link Expired",
            description:
                "Your verification link has expired. Get a new link sent to your email.",
            buttonText: resendForgotPassword.isPending
                ? "Resending..."
                : "Resend",
            action: () =>
                resendForgotPassword.mutate({
                    email: validToken.error?.data?.email,
                }),
            isShowSignin: true,
            isDisableButton: resendForgotPassword.isPending,
            messageError: resendForgotPassword.error?.message || "",
        },
        resend: {
            title: "Check your mail box",
            description:
                "Please follow the instructions in your mailbox to reset your password.",
            buttonText: `Resend${timerResend === 0 || resendForgotPassword.isIdle ? "" : ` in ${timerResend}s`}`,
            action: () => {
                resendForgotPassword.mutate({
                    email: validToken.error?.data?.email,
                });
                setTimerResend(TIMER_RESEND_SECONDS);
            },
            isShowSignin: true,
            isDisableButton:
                (timerResend > 0 && !resendForgotPassword.isIdle) ||
                resendForgotPassword.isPending,
            messageError: resendForgotPassword.error?.message || "",
        },
    };

    // Status Handling
    const getSchemaStatus = useCallback(
        (status: keyof typeof schema) => ({
            status,
            data: schema[status],
        }),
        [timerResend, resendForgotPassword, validToken, isSuccessResend]
    );
    const determineRenderStatus = () => {
        // Otherwise, handle forgot password success or token validation status
        if (isSuccessResend || resendForgotPassword.isSuccess) {
            return getSchemaStatus("resend");
        }
        return getSchemaStatus(validToken.status);
    };

    const { status, data } = determineRenderStatus();

    // Timer Effect
    useEffect(() => {
        if (
            resendForgotPassword?.status !== "success" ||
            resetPasswordMutation?.status === "success" ||
            timerResend <= 0
        )
            return;

        timeResendRef.current = setInterval(() => {
            setTimerResend((prev) => {
                if (prev <= 1) {
                    clearInterval(timeResendRef.current!);
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timeResendRef.current) clearInterval(timeResendRef.current);
        };
    }, [
        timerResend,
        resendForgotPassword.status,
        resetPasswordMutation?.status,
    ]);

    useEffect(() => {
        if (resendForgotPassword?.status === "success") {
            setIsLoadedResend(true);
        }
    }, [resendForgotPassword?.status]);

    // Render Logic
    const shouldShowAuthStatus =
        validToken.status !== "success" ||
        resetPasswordMutation?.status === "success";

    // Render
    return (
        <div className="flex flex-col">
            {shouldShowAuthStatus ? (
                <AuthStatus status={status} {...data} />
            ) : (
                <>
                    <CredentialsHead title="Reset password" breadcrumb />
                    <CredentialsResetPasswordForm />
                </>
            )}
        </div>
    );
}
