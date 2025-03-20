import { IconArrowRight } from "@/components/shared/icons/icon-ar-right";
import ImagePlaceholder from "@/components/shared/image-placeholder";
import { Button } from "@/components/ui/button";
import { TBannerItem } from "..";

export const SecondaryBanner: React.FC<{ data: TBannerItem }> = ({ data }) => (
    <div className="relative row-span-1 flex items-center overflow-hidden rounded-[0.625rem] p-[2rem]">
        <ImagePlaceholder
            src={data.imageSrc}
            alt="secondary-banner"
            width={data.imageWidth}
            height={data.imageHeight}
            className="absolute inset-0 -z-10"
        />
        <div className={`mt-auto flex flex-col ${data.maxWidthClass}`}>
            <h2 className="mb-4 text-3xl font-medium text-white-main">
                {data.title}
            </h2>
            <Button
                className="w-max text-brand hover:text-brand-darker"
                size="lg"
                variant="link"
            >
                Explore more
                <IconArrowRight />
            </Button>
        </div>
    </div>
);
