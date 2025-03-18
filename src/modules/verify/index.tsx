"use client";

import AuthStatus from "@/components/shared/auth/auth-status";
import { TIMER_REDIRECT, TIMER_RESEND_SECONDS } from "@/lib/constants";
import { KEY_RESEND_EMAIL, KEY_VERIFY } from "@/lib/constants/key";
import { ROUTE_AUTH } from "@/lib/constants/route";
import authService from "@/services/auth";
import { TVerifyUser } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { redirect, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function VerifyModule() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [timer, setTimer] = useState(TIMER_REDIRECT);
    const [timerResend, setTimerResend] = useState(TIMER_RESEND_SECONDS);
    const [isSuccessResend, setIsLoadedResend] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const timeResendRef = useRef<NodeJS.Timeout | null>(null);

    // Data Fetching
    const verifyUser = useQuery({
        queryKey: [KEY_VERIFY],
        queryFn: () => authService.verifyUser({ token } as TVerifyUser),
        retry: false,
        enabled: !!token,
    });

    const resendEmailMutation = useMutation({
        mutationFn: authService.resendEmailVerification,
        gcTime: Infinity,
        mutationKey: [KEY_RESEND_EMAIL],
    });

    // Schema Configuration
    const schema = {
        success: {
            title: "Account Verified",
            description: `You’ll be redirected to the login page in ${timer} seconds.`,
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
            action: () => {
                return;
            },
            isShowSignin: false,
            isDisableButton: true,
            messageError: "",
        },
        error: {
            title: "Link Expired",
            description:
                "Your verification link has expired. Get a new link sent to your email.",
            buttonText: resendEmailMutation.isPending
                ? "Resending..."
                : "Resend",
            action: () =>
                resendEmailMutation.mutate(verifyUser.error?.data?.email),
            isShowSignin: true,
            isDisableButton: resendEmailMutation.isPending,
            messageError: resendEmailMutation.error?.message || "",
        },
        resend: {
            title: "Check your mail box",
            description:
                "Please follow the instructions in your mailbox to verify your account.",
            buttonText: `Resend${timerResend === 0 || resendEmailMutation.isIdle ? "" : ` in ${timerResend}s`}`,
            action: () => {
                resendEmailMutation.mutate(verifyUser.error?.data?.email);
                setTimerResend(TIMER_REDIRECT);
            },
            isShowSignin: true,
            isDisableButton:
                (timerResend > 0 && !resendEmailMutation.isIdle) ||
                resendEmailMutation.isPending,
            messageError: "",
        },
    };

    // Status Handling
    const isVerified = verifyUser.error?.message === "User is already verified";

    const getSchemaStatus = useCallback(
        (status: keyof typeof schema, isSuccess = false) => ({
            status: isSuccess ? "success" : status,
            data: isSuccess ? schema.success : schema[status],
        }),
        [timer, timerResend, resendEmailMutation]
    );

    const determineRenderStatus = () => {
        if (isSuccessResend || resendEmailMutation.isSuccess) {
            return getSchemaStatus("resend");
        }
        return getSchemaStatus(verifyUser.status, isVerified);
    };

    const { status, data } = determineRenderStatus();

    // Timer Effects
    useEffect(() => {
        if (status !== "success" || timer <= 0) return;

        timerRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    redirect(ROUTE_AUTH.SIGNIN);
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [status, timer]);

    useEffect(() => {
        if (timerResend <= 0) return;

        timeResendRef.current = setInterval(() => {
            setTimerResend((prev) => {
                if (prev <= 1) clearInterval(timeResendRef.current!);
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timeResendRef.current) clearInterval(timeResendRef.current);
        };
    }, [timerResend, resendEmailMutation.status]);

    useEffect(() => {
        if (resendEmailMutation?.status === "success") {
            setIsLoadedResend(true);
        }
    }, [resendEmailMutation?.status]);
    // Render
    return (
        <div className="flex flex-col">
            <AuthStatus {...data} status={status} />
        </div>
    );
}
