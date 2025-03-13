"use client";

import CredentialsHead from "@/components/shared/auth/credentials-head";
import CredentialsResendVerifyEmail from "@/components/shared/auth/credentials-resend-verify-email";
import ResendSuccess from "@/components/shared/auth/resend-success";
import { KEY_RESEND_EMAIL } from "@/lib/constants/key";
import { ROUTE_AUTH } from "@/lib/constants/route";
import { verifyUser } from "@/services/auth";
import { TVerifyUser } from "@/types";
import { useMutationState, useQuery } from "@tanstack/react-query";
import { redirect, useSearchParams } from "next/navigation";

export default function VerifyModule() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const { error, isSuccess } = useQuery({
        queryKey: ["verify-user"],
        queryFn: () => verifyUser({ token } as TVerifyUser),
        retry: false,
        enabled: !!token,
    });
    if (isSuccess) {
        redirect(ROUTE_AUTH.SIGNIN);
    }

    const data = useMutationState({
        filters: { mutationKey: [KEY_RESEND_EMAIL] },
        select: (mutation) => ({
            status: mutation.state.status,
            data: mutation.state.data as TVerifyUser,
        }),
    })[0];

    if (data?.status === "success") {
        return <ResendSuccess />;
    }
    return (
        <div className="flex flex-col">
            <CredentialsHead title="Verify Account" isLoading />
            {error && (
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
