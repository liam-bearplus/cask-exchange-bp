import IconSidebar from "@/components/shared/icons/icon-sidebar";
import LabelFilter from "@/components/shared/label-filter";
import Search from "@/components/shared/search";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselScrollbar,
} from "@/components/ui/carousel";
import { useSidebar } from "@/components/ui/sidebar";
import { SortFilter } from "../sort";

export default function ActionHeader() {
    const { setOpen } = useSidebar();
    return (
        <div className="mb-12 mt-10 flex w-full flex-col gap-4">
            <div className="mb-4 flex flex-row items-center justify-between">
                <div className="flex flex-row gap-4">
                    <Button
                        onClick={() => {
                            setOpen(true);
                        }}
                        variant={"secondary"}
                        className="min-w-fit"
                    >
                        <div className="flex flex-row gap-2">
                            <div className="h-5 w-5">
                                <IconSidebar />
                            </div>
                            <div className="text-sm font-medium">Filter</div>
                        </div>
                    </Button>
                    <Search
                        className="w-[22.0625rem]"
                        placeholder="Search by cask name"
                    />
                </div>
                <div className="w-[11.5625rem]">
                    <SortFilter />
                </div>
            </div>
            <div className="w-full overflow-hidden">
                <div className="relative flex w-full flex-row gap-4 pb-1.5">
                    <div className="max-w-full overflow-hidden rounded-sm">
                        <Carousel className="static">
                            <CarouselContent className="-mx-2">
                                <LabelFilter
                                    className="px-2"
                                    label="Caks"
                                    value="Caks"
                                />
                                <LabelFilter
                                    className="px-2"
                                    label="Caks"
                                    value="Caks"
                                />
                                <LabelFilter
                                    className="px-2"
                                    label="Caks"
                                    value="Caks"
                                />
                                <LabelFilter
                                    className="px-2"
                                    label="Caks"
                                    value="Caks"
                                />
                                <LabelFilter
                                    className="px-2"
                                    label="Caks"
                                    value="Caks"
                                />
                                <LabelFilter
                                    className="px-2"
                                    label="Caks"
                                    value="Caks"
                                />
                                <LabelFilter
                                    className="px-2"
                                    label="Caks"
                                    value="Caks"
                                />
                                <LabelFilter
                                    className="px-2"
                                    label="Caks"
                                    value="Caks"
                                />
                                <LabelFilter
                                    className="px-2"
                                    label="Caks"
                                    value="Caks"
                                />
                                <LabelFilter
                                    className="px-2"
                                    label="Caks"
                                    value="Caks"
                                />
                                <LabelFilter
                                    className="px-2"
                                    label="Caks"
                                    value="Caks"
                                />
                                <LabelFilter
                                    className="px-2"
                                    label="Caks"
                                    value="Caks"
                                />
                                <LabelFilter
                                    className="px-2"
                                    label="Caks"
                                    value="Caks"
                                />
                                <LabelFilter
                                    className="px-2"
                                    label="Caks"
                                    value="Caks"
                                />
                                <LabelFilter
                                    className="px-2"
                                    label="Caks"
                                    value="Caks"
                                />
                                <LabelFilter
                                    className="px-2"
                                    label="Caks"
                                    value="Caks"
                                />
                            </CarouselContent>
                            <div className="mt-4">
                                <CarouselScrollbar className="absolute w-full" />
                            </div>
                        </Carousel>
                    </div>

                    <div className="flex-shrink-0">
                        <Button
                            variant={"link"}
                            className="mt-1 text-sm font-medium"
                        >
                            Remove all
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
