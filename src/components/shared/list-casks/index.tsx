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
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function ListCask({
    lists,
    type,
    title,
    subTitle,
    isRevert,
    href,
}: {
    lists?: TDistillery[] | TCask[];
    title?: string;
    type: "distillery" | "cask";
    subTitle?: string;
    isRevert?: boolean;
    href?: string;
}) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const route = useRouter();
    return (
        <div className="flex flex-col pb-[5rem]">
            <Carousel
                opts={{
                    slidesToScroll: type === "distillery" ? 8 : 5,
                }}
                ref={carouselRef}
            >
                <div className="flex-between mb-12 flex flex-row">
                    {title && (
                        <HeadingContent subTitle={subTitle}>
                            {title}
                        </HeadingContent>
                    )}
                    <div className="flex-center flex flex-row gap-2">
                        <CarouselPrevious />
                        <CarouselNext />
                        <Button
                            variant="outline"
                            onClick={() => href && route.push(href || "")}
                            className="rounded-md text-typo-primary"
                        >
                            View all
                        </Button>
                    </div>
                </div>
                {type === "distillery" ? (
                    <CarouselContent
                        className={cn(
                            "flex cursor-grab flex-row",
                            "-mx-[0.5625rem]"
                        )}
                        onPointerDown={() => {
                            carouselRef.current?.classList.add(
                                "[&_*]:cursor-grabbing"
                            );
                        }}
                        onPointerUp={() => {
                            carouselRef.current?.classList.remove(
                                "[&_*]:cursor-grabbing"
                            );
                        }}
                    >
                        {lists?.map((cask, index) => {
                            return (
                                <DistilleryCard
                                    index={index}
                                    data={cask as TDistillery}
                                    key={cask.id}
                                    className="flex-[0_0_20%] px-[0.5625rem] xl-desktop:flex-[0_0_16.6666666667%] 2xl-desktop:flex-[0_0_12.5%]"
                                />
                            );
                        })}
                    </CarouselContent>
                ) : (
                    <CarouselContent
                        className="-mx-5 flex flex-row"
                        onPointerDown={() => {
                            carouselRef.current?.classList.add(
                                "[&_*]:cursor-grabbing"
                            );
                        }}
                        onPointerUp={() => {
                            carouselRef.current?.classList.remove(
                                "[&_*]:cursor-grabbing"
                            );
                        }}
                    >
                        {lists?.map((cask, index) => {
                            return (
                                <CaskCard
                                    data={cask as TCask}
                                    key={cask.id}
                                    index={index}
                                    isRevert={!!isRevert}
                                    className="flex-[0_0_25%] px-5 2xl-desktop:flex-[0_0_20%]"
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
