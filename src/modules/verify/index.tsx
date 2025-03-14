"use client";

import CredentialsHead from "@/components/shared/auth/credentials-head";
import CredentialsResendVerifyEmail from "@/components/shared/auth/credentials-resend-verify-email";
import ResendSuccess from "@/components/shared/auth/resend-success";
import useGetMutationState from "@/hooks/useGetMutationState";
import { KEY_RESEND_EMAIL, KEY_VERIFY } from "@/lib/constants/key";
import { ROUTE_AUTH } from "@/lib/constants/route";
import { verifyUser } from "@/services/auth";
import { TVerifyUser } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function VerifyModule() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [timer, setTimer] = useState<number>(5);
    const timerNode = useRef<NodeJS.Timeout>(null);
    const { error, isSuccess, isFetching } = useQuery({
        queryKey: [KEY_VERIFY],
        queryFn: () => verifyUser({ token } as TVerifyUser),
        retry: false,
        enabled: !!token,
    });

    useEffect(() => {
        if (timer > 0 && isSuccess) {
            timerNode.current = setInterval(() => {
                console.log("timer", timer);
                setTimer((prev) => {
                    if (prev === 0) {
                        redirect(ROUTE_AUTH.SIGNIN);
                        return prev;
                    }
                    return (prev -= 1);
                });
            }, 1000);

            return () => {
                timerNode.current && clearInterval(timerNode.current);
            };
        }
    }, [timer, isSuccess]);

    const data = useGetMutationState<TVerifyUser>({
        key: KEY_RESEND_EMAIL,
    });

    if (data?.status === "success") {
        return <ResendSuccess />;
    }

    return (
        <div className="flex flex-col">
            {isSuccess ? (
                <CredentialsHead
                    title="Verify Account is Success"
                    desc={`You will be redirected to the sign in page in ${timer} seconds`}
                    isLoading
                />
            ) : (
                <CredentialsHead
                    title="Verify Account"
                    isLoading={isFetching}
                    desc="Please wait, we are verifying your account"
                />
            )}
            {error && !isSuccess && (
                <div className="flex flex-col gap-4">
                    <div className="text-center text-sm font-medium text-destructive">
                        {error.message}
                    </div>
                    <CredentialsResendVerifyEmail />
                </div>
            )}
        </div>
    );
}
