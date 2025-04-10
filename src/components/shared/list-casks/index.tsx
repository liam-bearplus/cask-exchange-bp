import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { TCask, TDistillery } from "@/types";
import CaskCard from "../cask-card";
import HeadingContent from "../heading";
import DistilleryCard from "../distillery-card";

export default function ListCask({
    lists,
    type,
    title,
}: {
    lists?: TDistillery[] | TCask[];
    title?: string;
    type: "distillery" | "cask";
}) {
    return (
        <div className="flex flex-col rounded-lg pb-[5rem]">
            <Carousel>
                <div className="flex-between mb-12 flex flex-row">
                    {title && <HeadingContent>{title}</HeadingContent>}
                    <div className="flex-center flex flex-row gap-2">
                        <CarouselPrevious />
                        <CarouselNext />
                        <Button
                            variant="outline"
                            className="rounded-md"
                            mode={"dark"}
                        >
                            View all
                        </Button>
                    </div>
                </div>
                <CarouselContent className="flex flex-row gap-10">
                    {lists?.map((cask) => {
                        if (type === "distillery") {
                            return (
                                <DistilleryCard
                                    data={cask as TDistillery}
                                    key={cask.id}
                                />
                            );
                        } else {
                            return (
                                <CaskCard data={cask as TCask} key={cask.id} />
                            );
                        }
                    })}
                </CarouselContent>
            </Carousel>
        </div>
    );
}
