"use client";

import useEmblaCarousel, {
    type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EmblaCarouselType } from "embla-carousel";
import { Skeleton } from "./skeleton";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
    opts?: CarouselOptions;
    plugins?: CarouselPlugin;
    orientation?: "horizontal" | "vertical";
    setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0];
    api: ReturnType<typeof useEmblaCarousel>[1];
    scrollPrev: () => void;
    scrollNext: () => void;
    canScrollPrev: boolean;
    canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
    const context = React.useContext(CarouselContext);

    if (!context) {
        throw new Error("useCarousel must be used within a <Carousel />");
    }

    return context;
}
type UseDotButtonType = {
    selectedIndex: number;
    scrollSnaps: number[];
    onDotButtonClick: (index: number) => void;
};

const useDotButton = (
    emblaApi: EmblaCarouselType | undefined,
    onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UseDotButtonType => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

    const onDotButtonClick = React.useCallback(
        (index: number) => {
            if (!emblaApi) return;
            emblaApi.scrollTo(index);
            if (onButtonClick) onButtonClick(emblaApi);
        },
        [emblaApi, onButtonClick]
    );

    const onInit = React.useCallback((emblaApi: EmblaCarouselType) => {
        setScrollSnaps(emblaApi.scrollSnapList());
    }, []);

    const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    React.useEffect(() => {
        if (!emblaApi) return;

        onInit(emblaApi);
        onSelect(emblaApi);

        emblaApi
            .on("reInit", onInit)
            .on("reInit", onSelect)
            .on("select", onSelect);
    }, [emblaApi, onInit, onSelect]);

    return {
        selectedIndex,
        scrollSnaps,
        onDotButtonClick,
    };
};
type UseAutoplayType = {
    autoplayIsPlaying: boolean;
    toggleAutoplay: (value?: boolean) => void;
    onAutoplayButtonClick: (callback: () => void) => void;
};

export const useAutoplay = (
    emblaApi: EmblaCarouselType | undefined
): UseAutoplayType => {
    const [autoplayIsPlaying, setAutoplayIsPlaying] = React.useState(false);

    const onAutoplayButtonClick = React.useCallback(
        (callback: () => void) => {
            const autoplay = emblaApi?.plugins()?.autoplay;
            if (!autoplay) return;

            const resetOrStop =
                autoplay.options.stopOnInteraction === false
                    ? autoplay.reset
                    : autoplay.stop;

            resetOrStop();
            callback();
        },
        [emblaApi]
    );

    const toggleAutoplay = React.useCallback(
        (val?: boolean) => {
            const autoplay = emblaApi?.plugins()?.autoplay;
            if (!autoplay) return;
            if (val) {
                val ? autoplay.play() : autoplay.stop();
                return;
            }
            const playOrStop = autoplay.isPlaying()
                ? autoplay.stop
                : autoplay.play;
            playOrStop();
        },
        [emblaApi]
    );

    React.useEffect(() => {
        const autoplay = emblaApi?.plugins()?.autoplay;
        if (!autoplay) return;

        setAutoplayIsPlaying(autoplay.isPlaying());
        emblaApi
            .on("autoplay:play", () => setAutoplayIsPlaying(true))
            .on("autoplay:stop", () => setAutoplayIsPlaying(false))
            .on("reInit", () => setAutoplayIsPlaying(autoplay.isPlaying()));
    }, [emblaApi]);

    return {
        autoplayIsPlaying,
        toggleAutoplay,
        onAutoplayButtonClick,
    };
};

const Carousel = React.forwardRef<
    HTMLDivElement | null,
    React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
    (
        {
            orientation = "horizontal",
            opts,
            setApi,
            plugins,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const [carouselRef, api] = useEmblaCarousel(
            {
                ...opts,
                axis: orientation === "horizontal" ? "x" : "y",
            },
            plugins
        );
        const [canScrollPrev, setCanScrollPrev] = React.useState(false);
        const [canScrollNext, setCanScrollNext] = React.useState(false);

        const onSelect = React.useCallback((api: CarouselApi) => {
            if (!api) {
                return;
            }

            setCanScrollPrev(api.canScrollPrev());
            setCanScrollNext(api.canScrollNext());
        }, []);

        const scrollPrev = React.useCallback(() => {
            api?.scrollPrev();
        }, [api]);

        const scrollNext = React.useCallback(() => {
            api?.scrollNext();
        }, [api]);

        const handleKeyDown = React.useCallback(
            (event: React.KeyboardEvent<HTMLDivElement>) => {
                if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    scrollPrev();
                } else if (event.key === "ArrowRight") {
                    event.preventDefault();
                    scrollNext();
                }
            },
            [scrollPrev, scrollNext]
        );

        React.useEffect(() => {
            if (!api || !setApi) {
                return;
            }

            setApi(api);
        }, [api, setApi]);

        React.useEffect(() => {
            if (!api) {
                return;
            }

            onSelect(api);
            api.on("reInit", onSelect);
            api.on("select", onSelect);

            return () => {
                api?.off("select", onSelect);
            };
        }, [api, onSelect]);

        return (
            <CarouselContext.Provider
                value={{
                    carouselRef,
                    api: api,
                    opts,
                    orientation:
                        orientation ||
                        (opts?.axis === "y" ? "vertical" : "horizontal"),
                    scrollPrev,
                    scrollNext,
                    canScrollPrev,
                    canScrollNext,
                }}
            >
                <div
                    onMouseLeave={() => {
                        api?.plugins().autoplay?.play();
                    }}
                    ref={ref}
                    onKeyDownCapture={handleKeyDown}
                    className={cn("relative", className)}
                    role="region"
                    aria-roledescription="carousel"
                    {...props}
                >
                    {children}
                </div>
            </CarouselContext.Provider>
        );
    }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    return (
        <div ref={carouselRef} className="overflow-hidden rounded-lg">
            <div
                ref={ref}
                className={cn(
                    "flex",
                    orientation === "horizontal" ? "flex-row" : "flex-col",
                    className
                )}
                {...props}
            />
        </div>
    );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
        <div
            ref={ref}
            role="group"
            aria-roledescription="slide"
            className={cn(
                "min-w-0 shrink-0 grow-0 basis-full",
                orientation === "horizontal" ? "pl-4" : "pt-4",
                className
            )}
            {...props}
        />
    );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<typeof Button>
>(({ className, variant = "ghost", size = "icon", mode, ...props }, ref) => {
    const { scrollPrev, canScrollPrev } = useCarousel();

    return (
        <Button
            ref={ref}
            variant={variant}
            size={size}
            mode={mode}
            className={cn("rounded-md", className)}
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            {...props}
        >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
        </Button>
    );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<typeof Button>
>(({ className, variant = "ghost", size = "icon", mode, ...props }, ref) => {
    const { scrollNext, canScrollNext } = useCarousel();

    return (
        <Button
            ref={ref}
            variant={variant}
            mode={mode}
            size={size}
            className={cn("rounded-md text-typo-dark-disable", className)}
            disabled={!canScrollNext}
            onClick={scrollNext}
            {...props}
        >
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">Next slide</span>
        </Button>
    );
});
CarouselNext.displayName = "CarouselNext";
type PropType = React.ComponentPropsWithRef<"button"> & {
    isActive?: boolean;
};

export const CarouselDotButton: React.FC<PropType> = (props) => {
    const { children, isActive, className, ...restProps } = props;

    return (
        <button
            type="button"
            className={cn(
                "flex-center h-2 w-2 flex-shrink-0 overflow-hidden rounded-full text-center transition-all duration-700",
                isActive && "w-6",
                className
            )}
            {...restProps}
        >
            <div
                className={cn(
                    "h-full w-6 flex-shrink-0 origin-center scale-x-[0.33] overflow-hidden rounded-full bg-bd-dark-sf1 transition-all delay-200 duration-300",
                    isActive && "scale-x-100 bg-brand"
                )}
            ></div>
            {children}
        </button>
    );
};

export const CarouselDotGroup = () => {
    const { api } = useCarousel();
    const { selectedIndex, scrollSnaps } = useDotButton(api);
    return (
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-row gap-1">
            {scrollSnaps &&
                scrollSnaps?.map((_, index) => (
                    <CarouselDotButton
                        key={index}
                        onClick={() => {
                            api?.scrollTo(index);
                        }}
                        isActive={selectedIndex === index}
                    />
                ))}
        </div>
    );
};
export const CarouselDotButtonSkeleton = () => {
    return (
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-row gap-1">
            <Skeleton className="h-2 w-6 rounded-full bg-bg-sf2" />
            <Skeleton className="h-2 w-2 rounded-full bg-bg-sf2" />
            <Skeleton className="h-2 w-2 rounded-full bg-bg-sf2" />
            <Skeleton className="h-2 w-2 rounded-full bg-bg-sf2" />
        </div>
    );
};

export {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    useDotButton,
    type CarouselApi,
};
