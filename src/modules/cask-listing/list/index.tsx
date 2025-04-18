import AuthStatus from "@/components/shared/auth/auth-status";
import CaskCardItem, { CaskCardSkeleton } from "@/components/shared/cask-card";
import CaskEmpty from "@/components/shared/cask-notfound";
import IconChevonLeft from "@/components/shared/icons/icon-chevon-left";
import IconChevonRight from "@/components/shared/icons/icon-chevon-right";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { KEY_GET_CASK, KEY_RESEND_EMAIL } from "@/lib/constants/key";
import { PARAMS } from "@/lib/constants/route";
import authService from "@/services/auth";
import caskServices from "@/services/cask";
import { useBoundStore } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function CaskList() {
    const params = useSearchParams();
    const { user } = useBoundStore();
    const [changeParams, setChangeParams] = useState("");
    const filterData = params.get(`${PARAMS.filter}`);
    const sortData = params.get(PARAMS.sortBy);
    const [size, setSize] = useState(20);
    const [page, setPage] = useState(1);
    const [openAlert, setOpenAlert] = useState(false);
    const queryClient = useQueryClient();

    const resendEmailMutation = useMutation({
        mutationFn: authService.resendEmailVerification,
        gcTime: Infinity,
        mutationKey: [KEY_RESEND_EMAIL],
    });
    const casksQuery = useQuery({
        queryKey: [KEY_GET_CASK, changeParams, size, page],
        queryFn: () => {
            return caskServices.getCaskListing(
                `${changeParams}&${PARAMS.size}=${size}&${PARAMS.page}=${page}`
            );
        },
        placeholderData: (prev) => prev,
    });

    const sizeParams = casksQuery.data?.size || 0;
    const pageParams = casksQuery.data?.page || 0;
    const totalRecords = casksQuery.data?.totalRecords || 0;
    const totalPages = casksQuery.data?.totalPages || 0;
    const visibleItems = 7;

    const dataPagination = useCallback(() => {
        const idCenter = Math.floor(totalPages / 2);
        const distance = Math.round((totalPages - visibleItems) / 2) + 1;
        const newArray = Array.from({ length: totalPages }, (_, i) => {
            if (
                i !== idCenter &&
                idCenter - distance < i &&
                idCenter + distance > i &&
                i !== totalPages - 1 &&
                i !== 0
            ) {
                return null;
            }
            return i + 1;
        }).filter(Boolean);
        return newArray;
    }, [sizeParams, pageParams, totalPages]);

    useEffect(() => {
        const params = [
            filterData && `${filterData}`,
            sortData && `${PARAMS.sortBy}=${sortData}`,
        ]
            .filter(Boolean)
            .join("&");

        setChangeParams(params || "");
        setSize(20);
        setPage(1);
    }, [filterData, sortData]);

    const isDisabled = useMemo(() => {
        return totalPages === 0 || totalPages === 1;
    }, [totalPages]);

    const renderPagination = useCallback(() => {
        return (
            <div className="mb-[4.625rem] flex w-full items-center justify-between border-t border-bd-main pt-5">
                <Pagination>
                    <Button
                        variant={"empty"}
                        className="!min-w-max text-typo-primary"
                        disabled={isDisabled || page === 1}
                        onClick={() => {
                            if (isDisabled || page === 1) return;
                            setPage(page - 1);
                        }}
                    >
                        <div className="h-4 w-4">
                            <IconChevonLeft />
                        </div>
                    </Button>
                    <PaginationContent>
                        {dataPagination().map((num, i, args) => {
                            const idCenter = Math.floor(args.length / 2);
                            const isCenter =
                                (i === idCenter + page - 1 &&
                                    i !== totalPages - 1) ||
                                (i === page - 1 - idCenter && i !== 0);
                            const isActive = num === pageParams;

                            return (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        onClick={() => {
                                            if (isCenter) return;
                                            setPage(num as number);
                                        }}
                                        onMouseEnter={() => {
                                            queryClient.prefetchQuery({
                                                queryKey: [
                                                    KEY_GET_CASK,
                                                    changeParams,
                                                    size,
                                                    num,
                                                ],
                                            });
                                        }}
                                        className={
                                            isActive
                                                ? "bg-bg-sf1"
                                                : isCenter
                                                  ? "!pointer-events-none"
                                                  : ""
                                        }
                                        isActive={isActive}
                                    >
                                        {isCenter ? "..." : num}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}
                    </PaginationContent>
                    <Button
                        variant={"empty"}
                        className="!min-w-max text-typo-primary"
                        onClick={() => {
                            if (isDisabled || page === totalPages) return;
                            setPage(page + 1);
                        }}
                        disabled={isDisabled || page === totalPages}
                    >
                        <div className="h-4 w-4">
                            <IconChevonRight />
                        </div>
                    </Button>
                </Pagination>
                <div className="whitespace-nowrap text-base">
                    Showing{" "}
                    <span className="font-medium">
                        {sizeParams * pageParams - sizeParams + 1} -{" "}
                        {sizeParams * (pageParams - 1) +
                            (casksQuery.data?.data?.length ?? 0)}{" "}
                    </span>{" "}
                    of <span className="font-medium">{totalRecords}</span>{" "}
                    results
                </div>
            </div>
        );
    }, [pageParams, sizeParams, totalRecords, totalPages]);
    const renderVerify = useCallback(() => {
        const buttonState = {
            pending: {
                title: "Resending verification email...",
                isDisable: true,
            },
            success: {
                title: "Verify your email to see more",
                isDisable: true,
            },
            error: {
                title: "Verify your email to see more",
                isDisable: false,
            },
            idle: {
                title: "Verify your email to see more",
                isDisable: false,
            },
        };
        const handleResendMail = async () => {
            const isDisable = buttonState[resendEmailMutation.status].isDisable;
            if (!user?.email || !user || isDisable) return;

            await resendEmailMutation.mutateAsync(user.email);
            setOpenAlert(true);
        };

        return (
            <div className="flex-center -mt-[1.125rem] mb-[6.25rem] flex w-full">
                <Dialog open={openAlert} onOpenChange={setOpenAlert}>
                    <div className="flex flex-col items-center gap-1.5">
                        <Button
                            variant={"outline"}
                            size={"lg"}
                            disabled={
                                buttonState[resendEmailMutation.status]
                                    .isDisable
                            }
                            onClick={handleResendMail}
                        >
                            {buttonState[resendEmailMutation.status].title}
                        </Button>
                        {resendEmailMutation.error?.message && (
                            <div className="text-sm font-medium text-destructive">
                                {resendEmailMutation.error?.message ||
                                    "Something went wrong"}
                            </div>
                        )}
                    </div>
                    <DialogContent className="p-0">
                        <>
                            <DialogTitle> </DialogTitle>

                            <AuthStatus
                                status="resend"
                                buttonText="Got it"
                                title="Check your mailbox"
                                className="p-8"
                                action={() => setOpenAlert(false)}
                            >
                                Please follow the instructions in your mailbox
                                to verify your account. If you don’t see it,
                                check your spam folder or your credentials.
                            </AuthStatus>
                        </>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }, [user, openAlert, setOpenAlert, resendEmailMutation]);
    const renderCaskLoading = useCallback(() => {
        return (
            <div className="mb-20 grid w-full grid-cols-10 flex-wrap gap-x-10 gap-y-12">
                {Array.from({ length: 20 }, (_, i) => (
                    <CaskCardSkeleton key={i} className="col-span-2" />
                ))}
            </div>
        );
    }, [casksQuery.isLoading]);

    return (
        <div className="w-full">
            {casksQuery.isLoading ? (
                renderCaskLoading()
            ) : casksQuery.isError ? (
                <div>Error: {casksQuery.error?.message}</div>
            ) : casksQuery.data?.data?.length === 0 ? (
                <CaskEmpty />
            ) : (
                <div className="flex flex-col">
                    <div className="mb-20 grid grid-cols-10 flex-wrap gap-x-10 gap-y-12">
                        {casksQuery.data?.data?.map((cask) => (
                            <CaskCardItem
                                className="col-span-2"
                                key={cask.id}
                                data={cask}
                                isRevert={false}
                                index={0}
                            />
                        ))}
                    </div>
                    {user?.isVerified ? renderPagination() : renderVerify()}
                </div>
            )}
        </div>
    );
}
