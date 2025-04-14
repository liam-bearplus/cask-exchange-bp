import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { TCask, TDistillery } from "@/types";
import CaskCard, { CaskCardSkeleton } from "../cask-card";
import DistilleryCard, { DistilleryCardSkeleton } from "../distillery-card";
import HeadingContent, { HeadingContentSkeleton } from "../heading";

export default function ListCask({
    lists,
    type,
    title,
    subTitle,
    isRevert,
}: {
    lists?: TDistillery[] | TCask[];
    title?: string;
    type: "distillery" | "cask";
    subTitle?: string;
    isRevert?: boolean;
}) {
    return (
        <div className="flex flex-col pb-[5rem]">
            <Carousel className="rounded-lg">
                <div className="flex-between mb-12 flex flex-row">
                    {title && (
                        <HeadingContent subTitle={subTitle}>
                            {title}
                        </HeadingContent>
                    )}
                    <div className="flex-center flex flex-row gap-2">
                        <CarouselPrevious />
                        <CarouselNext />
                        <Button variant="outline" className="rounded-md">
                            View all
                        </Button>
                    </div>
                </div>
                {type === "distillery" ? (
                    <CarouselContent className="flex flex-row gap-[1.125rem]">
                        {lists?.map((cask, index) => {
                            return (
                                <DistilleryCard
                                    index={index}
                                    data={cask as TDistillery}
                                    key={cask.id}
                                />
                            );
                        })}
                    </CarouselContent>
                ) : (
                    <CarouselContent className="flex flex-row gap-10">
                        {lists?.map((cask, index) => {
                            return (
                                <CaskCard
                                    data={cask as TCask}
                                    key={cask.id}
                                    index={index}
                                    isRevert={!!isRevert}
                                />
                            );
                        })}
                    </CarouselContent>
                )}
            </Carousel>
        </div>
    );
}

export function ListCaskSkeleton({ type }: { type: "cask" | "distillery" }) {
    return (
        <div className="flex flex-col rounded-lg pb-[5rem]">
            <div className="flex flex-col gap-12">
                <div className="flex-between flex flex-row">
                    <HeadingContentSkeleton />
                    <div className="flex flex-row gap-2">
                        <Skeleton className="h-10 w-10" />
                        <Skeleton className="h-10 w-10" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                </div>
                {type === "distillery" ? (
                    <div className="flex flex-row gap-[1.125rem]">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <DistilleryCardSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-row gap-10">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CaskCardSkeleton key={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
