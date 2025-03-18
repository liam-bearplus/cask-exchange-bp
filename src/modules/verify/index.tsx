"use client";

import AuthStatus from "@/components/shared/auth/auth-status";
import { TIMER_REDIRECT } from "@/lib/constants";
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
    const [isSuccessResend, setIsLoadedResend] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

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
            description: (
                <div className="flex items-center">
                    You&apos;ll be redirected to the login page in
                    <span className="font-medium">&nbsp;{timer}&nbsp;</span>
                    seconds.
                </div>
            ),
            buttonText: "Log in now",
            action: () => redirect(ROUTE_AUTH.LOGIN),

            isDisableButton: false,
            messageError: "",
        },
        pending: {
            title: "Account Verifying...",
            description: (
                <div className="flex items-center">
                    We&apos;re confirming your details. This might take a
                    moment.
                </div>
            ),
            buttonText: "Verifying...",
            action: () => {
                return;
            },

            isDisableButton: true,
            messageError: "",
        },
        error: {
            title: "Link Expired",
            description: (
                <div className="flex items-center">
                    Your verification link has expired. Get a new link sent to
                    your email.
                </div>
            ),
            buttonText: resendEmailMutation.isPending
                ? "Resending..."
                : "Resend",
            action: () =>
                resendEmailMutation.mutate(verifyUser.error?.data?.email),

            isDisableButton: resendEmailMutation.isPending,
            messageError: resendEmailMutation.error?.message || "",
        },
        resend: {
            title: "Check your mailbox",
            description: (
                <div className="flex items-center">
                    Please follow the instructions in your mailbox to verify
                    your account. If you don’t see it, check your spam folder or
                    your credentials.
                </div>
            ),
            buttonText: "Back to sign up",
            action: () => {
                redirect(ROUTE_AUTH.SIGNUP);
            },

            isDisableButton: false,
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
        [timer, resendEmailMutation]
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
                    redirect(ROUTE_AUTH.LOGIN);
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [status, timer]);

    useEffect(() => {
        if (resendEmailMutation?.status === "success") {
            setIsLoadedResend(true);
        }
    }, [resendEmailMutation?.status]);
    // Render
    return (
        <div className="flex flex-col">
            <AuthStatus {...data} status={status}>
                {data.description}
            </AuthStatus>
        </div>
    );
}
