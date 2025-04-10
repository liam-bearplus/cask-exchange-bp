import ImagePlaceholder from "@/components/shared/image-placeholder";
import { Button } from "@/components/ui/button";
import { TBannerItem } from "..";
import { cn } from "@/lib/utils";

export const BannerCard: React.FC<{
    data: TBannerItem;
    className?: string;
}> = ({ data, className }) => (
    <div
        className={cn(
            "relative row-span-2 flex aspect-[1330/400] items-center overflow-hidden rounded-[0.625rem] p-[3.75rem] tablet:col-span-2 tablet:row-span-3",
            className
        )}
    >
        <ImagePlaceholder
            src={data.imageSrc}
            alt="primary-banner"
            width={2660}
            height={800}
            className="absolute inset-0 -z-10"
        />
        <div className={`flex flex-col`}>
            <h1 className="mb-4 max-w-[30.0625rem] text-5xl font-medium text-white-main">
                {data.title}
            </h1>
            <div className="mb-8 max-w-[25.375rem] text-base text-typo-dark-body">
                {data.description}
            </div>
            <Button className="w-max" size="lg" variant="primary">
                Explore more
            </Button>
        </div>
    </div>
);
