"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, redirect } from "next/navigation";
import CredentialsHead from "@/components/shared/auth/credentials-head";
import CredentialsResendVerifyEmail from "@/components/shared/auth/credentials-resend-verify-email";
import ResendSuccess from "@/components/shared/auth/resend-success";
import useGetMutationState from "@/hooks/useGetMutationState";
import { verifyUser } from "@/services/auth";
import { KEY_VERIFY, KEY_RESEND_EMAIL } from "@/lib/constants/key";
import { ROUTE_AUTH } from "@/lib/constants/route";
import { TVerifyUser } from "@/types";

export default function VerifyModule() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const { error, isSuccess, isFetching } = useQuery({
        queryKey: [KEY_VERIFY],
        queryFn: () => verifyUser({ token } as TVerifyUser),
        retry: false,
        enabled: !!token,
    });

    const [timer, setTimer] = useState(5);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isSuccess || timer <= 0) return;

        timerRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    redirect(ROUTE_AUTH.SIGNIN);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isSuccess, timer]);

    const resendData = useGetMutationState<TVerifyUser>({
        key: KEY_RESEND_EMAIL,
    });

    if (resendData?.status === "success") {
        return <ResendSuccess />;
    }

    const isVerifying = isFetching && !isSuccess;
    const hasError = error && !isSuccess;

    return (
        <div className="flex flex-col gap-4">
            <CredentialsHead
                title={
                    isSuccess ? "Verify Account is Success" : "Verify Account"
                }
                desc={
                    isSuccess
                        ? `You will be redirected to the sign in page in ${timer} seconds`
                        : "Please wait, we are verifying your account"
                }
                isLoading={isVerifying}
            />
            {hasError && (
                <div className="flex flex-col gap-4">
                    <p className="text-center text-sm font-medium text-destructive">
                        {error.message}
                    </p>
                    <CredentialsResendVerifyEmail />
                </div>
            )}
        </div>
    );
}
