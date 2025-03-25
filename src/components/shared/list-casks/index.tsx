import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { TCask } from "@/types";
import CaskCardItem from "../cask-card";

export default function ListCask({
    lists,
    title,
}: {
    lists?: TCask[];
    title?: string;
}) {
    return (
        <div className="container flex flex-col pb-[6.25rem]">
            <Carousel>
                <div className="flex-between mb-12 flex flex-row">
                    {title && (
                        <h2 className="text-3xl font-semibold text-typo-dark-primary">
                            {title}
                        </h2>
                    )}
                    <div className="flex-center flex flex-row gap-2">
                        <Button
                            variant="ghost"
                            className="min-w-fit rounded-md"
                            mode={"dark"}
                        >
                            View all
                        </Button>
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </div>
                <CarouselContent className="flex flex-row gap-7">
                    {lists?.map((cask) => {
                        return <CaskCardItem data={cask} />;
                    })}
                </CarouselContent>
            </Carousel>
        </div>
    );
}
