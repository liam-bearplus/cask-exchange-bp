import React from "react";
import { BannerCard } from "./banner-card";
import {
    Carousel,
    CarouselContent,
    CarouselDotGroup,
    CarouselItem,
} from "@/components/ui/carousel";

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
    return (
        <div className="mb-[6.25rem]">
            <Carousel className="overflow-hidden rounded-lg">
                <CarouselContent className="gap-8">
                    {bannerData.map((banner, index) => (
                        <BannerCard
                            key={index}
                            data={banner}
                            className="w-full flex-shrink-0 select-none"
                        />
                    ))}
                </CarouselContent>
                <CarouselDotGroup />
            </Carousel>
        </div>
    );
}
