import React from "react";
import { PrimaryBanner } from "./primary-banner";
import { SecondaryBanner } from "./second-banner";

export type TBannerItem = {
    title: React.ReactNode;
    description?: string;
    imageSrc: string;
    imageWidth: number;
    imageHeight: number;
    isPrimary?: boolean;
    maxWidthClass: string;
};

const bannerData: TBannerItem[] = [
    {
        title: (
            <>
                Introducing our latest <span className="text-brand">cask</span>{" "}
                release
            </>
        ),
        description:
            "Discover the rich flavors of our newest cask, crafted to perfection for an exceptional experience.",
        imageSrc: "/images/banner_1.jpg",
        imageWidth: 2004,
        imageHeight: 1220,
        isPrimary: true,
        maxWidthClass: "max-w-[28.125rem]",
    },
    {
        title: "Upcoming Prospective Casks",
        imageSrc: "/images/banner_2.jpg",
        imageWidth: 1200,
        imageHeight: 600,
        maxWidthClass: "max-w-[19.25rem]",
    },
    {
        title: "New Cask from Glenmorangie Now Available",
        imageSrc: "/images/banner_3.jpg",
        imageWidth: 1200,
        imageHeight: 600,
        maxWidthClass: "max-w-[19.25rem]",
    },
];

export default function Banner() {
    return (
        <div className="grid h-[38.125rem] grid-cols-[1002fr_587fr] grid-rows-2 gap-4">
            {bannerData.map((banner, index) =>
                banner.isPrimary ? (
                    <PrimaryBanner key={index} data={banner} />
                ) : (
                    <SecondaryBanner key={index} data={banner} />
                )
            )}
        </div>
    );
}
