import ImagePlaceholder from "@/components/shared/image-placeholder";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Banner() {
    return (
        <div className="grid h-[38.125rem] grid-cols-[1002fr_587fr] gap-4">
            <div className="relative row-span-2 flex items-center overflow-hidden rounded-[0.625rem] p-[3.75rem]">
                <ImagePlaceholder
                    src="/images/banner_1.jpg"
                    alt="banner-1"
                    width={2004}
                    height={1220}
                    className="absolute inset-0 -z-10"
                />
                <div className="flex max-w-[28.125rem] flex-col">
                    <h1 className="text-5xl text-white-main mb-6 font-medium">
                        Introducing our latest{" "}
                        <span className="text-brand">cask</span> release
                    </h1>
                    <div className="mb-12 text-base text-typo-dark-body">
                        Discover the rich flavors of our newest cask, crafted to
                        perfection for an exceptional experience.
                    </div>
                    <Button className="w-max" size="lg" variant="primary">
                        Explore more
                    </Button>
                </div>
            </div>
            <div className="relative flex items-center overflow-hidden rounded-[0.625rem] p-[3.75rem]">
                <ImagePlaceholder
                    src="/images/banner_2.jpg"
                    alt="banner-1"
                    width={1200}
                    height={600}
                    className="absolute inset-0 -z-10"
                />
            </div>
            <div className="relative flex items-center overflow-hidden rounded-[0.625rem] p-[3.75rem]">
                <ImagePlaceholder
                    src="/images/banner_3.jpg"
                    alt="banner-1"
                    width={1200}
                    height={600}
                    className="absolute inset-0 -z-10"
                />
            </div>
        </div>
    );
}
