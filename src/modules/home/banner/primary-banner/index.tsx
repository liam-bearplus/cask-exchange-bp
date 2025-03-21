import ImagePlaceholder from "@/components/shared/image-placeholder";
import { Button } from "@/components/ui/button";
import { TBannerItem } from "..";

export const PrimaryBanner: React.FC<{ data: TBannerItem }> = ({ data }) => (
    <div className="tablet:col-span-2 tablet:row-span-3 relative row-span-2 flex items-center overflow-hidden rounded-[0.625rem] p-[3.75rem]">
        <ImagePlaceholder
            src={data.imageSrc}
            alt="primary-banner"
            width={data.imageWidth}
            height={data.imageHeight}
            className="absolute inset-0 -z-10"
        />
        <div className={`flex flex-col ${data.maxWidthClass}`}>
            <h1 className="text-white-main mb-6 text-5xl font-medium">
                {data.title}
            </h1>
            <div className="mb-12 text-base text-typo-dark-body">
                {data.description}
            </div>
            <Button className="w-max" size="lg" variant="primary">
                Explore more
            </Button>
        </div>
    </div>
);
