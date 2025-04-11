import {
    Carousel,
    CarouselContent,
    CarouselDotButtonSkeleton,
    CarouselDotGroup,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React, { useEffect } from "react";
import { BannerCard } from "./banner-card";
import { BannerCardSkeleton } from "./banner-card/index";
export type TBannerItem = {
    title: React.ReactNode;
    description?: string;
    imageSrc: string;
};

const bannerData: TBannerItem[] = [
    {
        title: (
            <>
                Introducing our latest <span className="text-brand">Cask</span>{" "}
                release
            </>
        ),
        description:
            "Discover the rich flavors of our newest cask, crafted to perfection for an exceptional experience.",
        imageSrc: "/images/banner_1.jpg",
    },
    {
        title: (
            <>
                Introducing our latest <span className="text-brand">Cask</span>{" "}
                release
            </>
        ),
        imageSrc: "/images/banner_2.jpg",
        description:
            "Discover the rich flavors of our newest cask, crafted to perfection for an exceptional experience.",
    },
    {
        title: (
            <>
                Introducing our latest <span className="text-brand">Cask</span>{" "}
                release
            </>
        ),
        imageSrc: "/images/banner_3.jpg",
        description:
            "Discover the rich flavors of our newest cask, crafted to perfection for an exceptional experience.",
    },
];

export default function Banner() {
    const [isLoading, setIsLoading] = React.useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Simulate a 2-second loading time

        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="mb-[6.25rem]">
            <Carousel
                className="overflow-hidden rounded-lg"
                opts={{
                    loop: true,
                }}
                plugins={[Autoplay()]}
            >
                <CarouselContent className="gap-8">
                    {bannerData.map((banner, index) =>
                        isLoading ? (
                            <BannerCardSkeleton key={index} />
                        ) : (
                            <BannerCard
                                key={index}
                                data={banner}
                                className="w-full flex-shrink-0 select-none"
                            />
                        )
                    )}
                </CarouselContent>
                {isLoading ? (
                    <CarouselDotButtonSkeleton />
                ) : (
                    <CarouselDotGroup />
                )}
            </Carousel>
        </div>
    );
}
