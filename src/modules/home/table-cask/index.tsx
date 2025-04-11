"use client";

import HeadingContent, {
    HeadingContentSkeleton,
} from "@/components/shared/heading";
import ImagePlaceholder from "@/components/shared/image-placeholder";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Chart } from "@/components/shared/chart";
import IconStar from "@/components/shared/icons/icon-start";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const invoices = [
    {
        rank: 1,
        name: "2022 Single Malt Whiskey (Release 2)",
        lowestAsk: 45000,
        highestBid: 48000,
        volume: 15000000,
        change: generatePrices(45000, 48000).percentChange,
        charts: "Charts",
        imgUrl: "/images/cask/cask_14.jpg",
        prices: generatePrices(45000, 48000).prices,
    },
    {
        rank: 2,
        name: "Ardbeg 10 Years TEN",
        lowestAsk: 38000,
        highestBid: 42000,
        volume: 12000000,
        change: generatePrices(38000, 42000).percentChange,
        charts: "Charts",
        imgUrl: "/images/cask/cask_2.jpg",
        prices: generatePrices(38000, 42000).prices,
    },
    {
        rank: 3,
        name: "Lagavulin 8 Years 200th Anniversary Limited Edition",
        lowestAsk: 32000,
        highestBid: 35000,
        volume: 9000000,
        change: generatePrices(32000, 35000).percentChange,
        charts: "Charts",
        imgUrl: "/images/cask/cask_1.jpg",
        prices: generatePrices(32000, 35000).prices,
    },
    {
        rank: 4,
        name: "Highland Park 12 Years Viking Honour",
        lowestAsk: 28000,
        highestBid: 31000,
        volume: 8500000,
        change: generatePrices(28000, 31000).percentChange,
        charts: "Charts",
        imgUrl: "/images/cask/cask_9.jpg",
        prices: generatePrices(28000, 31000).prices,
    },
    {
        rank: 5,
        name: "Bowmore",
        lowestAsk: 25000,
        highestBid: 27000,
        volume: 7000000,
        change: generatePrices(25000, 27000).percentChange,
        charts: "Charts",
        imgUrl: "/images/cask/cask_7.jpg",
        prices: generatePrices(25000, 27000).prices,
    },
];

export default function TableCask() {
    return (
        <div className="mb-20 flex flex-col">
            <HeadingContent>Top casks</HeadingContent>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow className="grid grid-cols-[0.5fr_4.01818181818fr_1fr_1fr_1fr_1fr_2.2636363636fr] !gap-x-6 py-2">
                            <TableHead className="w-[3.15rem]">Rank</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Lowest ask</TableHead>
                            <TableHead>Highest bid</TableHead>
                            <TableHead>Volume</TableHead>
                            <TableHead>24h change</TableHead>
                            <TableHead>Charts</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice, index) => (
                            <TableRow
                                key={index}
                                className="grid grid-cols-[0.5fr_4.01818181818fr_1fr_1fr_1fr_1fr_2.2636363636fr] !gap-x-6 border-0"
                            >
                                <TableCell className="text-center text-typo-body">
                                    {invoice.rank}
                                </TableCell>
                                <TableCell className="flex flex-row items-center gap-4">
                                    <ImagePlaceholder
                                        className="h-20 w-20 overflow-hidden rounded-[0.315rem]"
                                        width={160}
                                        height={160}
                                        alt={invoice.name}
                                        src={invoice.imgUrl}
                                    />
                                    <div className="text-base font-medium text-typo-primary">
                                        {invoice.name}
                                    </div>
                                </TableCell>
                                <TableCell className="text-base font-medium text-typo-primary">
                                    {formatCurrency(invoice.lowestAsk)}
                                </TableCell>
                                <TableCell className="text-base font-medium text-typo-primary">
                                    {formatCurrency(invoice.highestBid)}
                                </TableCell>
                                <TableCell className="text-base font-medium text-typo-primary">
                                    {formatCurrency(invoice.volume)}
                                </TableCell>
                                <TableCell
                                    className={cn(
                                        "text-base font-medium text-error",
                                        Number(invoice.change) > 0 &&
                                            "text-success"
                                    )}
                                >
                                    {invoice.change}%
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-row items-center justify-between">
                                        <div className="w-[calc(110/249*100%)]">
                                            <Chart data={invoice.prices} />
                                        </div>
                                        <Button
                                            variant={"empty"}
                                            className="!min-w-max p-4 text-typo-sub [&:hover]:text-brand [&:hover_path]:fill-brand [&_path]:fill-transparent [&_path]:transition-all [&_path]:duration-500"
                                        >
                                            <IconStar />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

function generatePrices(min: number, max: number) {
    // Use a seeded random number generator to ensure consistent results
    const seed = min * max; // Create a seed based on input parameters
    const prices = [] as {
        price: number;
        date: string;
        type: "up" | "down" | "sideways";
    }[];
    const hours = 24;

    // Custom seeded random function
    const seededRandom = (seed: number, index: number) => {
        const x = Math.sin(seed + index) * 10000;
        return x - Math.floor(x);
    };

    let prevPrice = (max + min) / 2;
    for (let i = 0; i < hours; i++) {
        const volatility = 2.5;
        const range = (max - min) * volatility;
        const midPoint = (max + min) / 2;

        // Use seeded random instead of Math.random()
        const price = Math.floor(
            midPoint + (seededRandom(seed, i) - 0.5) * range
        );
        const boundedPrice = Math.max(min, Math.min(max, price));

        // Determine price movement type
        let type: "up" | "down" | "sideways";
        const priceDiff = boundedPrice - prevPrice;
        const threshold = (max - min) * 0.01; // 1% threshold for sideways movement

        if (Math.abs(priceDiff) <= threshold) {
            type = "sideways";
        } else if (priceDiff > 0) {
            type = "up";
        } else {
            type = "down";
        }

        prices.push({
            price: boundedPrice,
            date: `${i}:00`,
            type,
        });

        prevPrice = boundedPrice;
    }

    const percentChange = (
        ((prices[hours - 1].price - prices[0].price) / prices[0].price) *
        100
    ).toFixed(1);

    return {
        prices,
        percentChange,
    };
}

export function TableCaskSkeleton() {
    return (
        <div className="mb-20 flex flex-col gap-12">
            <HeadingContentSkeleton />
            <div>
                <div>
                    <div className="grid grid-cols-[0.5fr_4.01818181818fr_1fr_1fr_1fr_1fr_2.2636363636fr] !gap-x-6 border-b border-bd-sf1 py-2">
                        <Skeleton className="h-2 w-[3.4375rem]" />
                        <Skeleton className="h-2 w-[3.4375rem]" />
                        <Skeleton className="h-2 w-full" />
                        <Skeleton className="h-2 w-full" />
                        <Skeleton className="h-2 w-full" />
                        <Skeleton className="h-2 w-full" />
                        <Skeleton className="h-2 w-full max-w-[6.875rem]" />
                    </div>
                    <div>
                        {Array.from({ length: 5 }).map((invoice, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-[0.5fr_4.01818181818fr_1fr_1fr_1fr_1fr_2.2636363636fr] !gap-x-6 border-0 py-4"
                            >
                                <Skeleton className="h-2 self-center" />
                                <div className="flex flex-row items-center gap-4">
                                    <Skeleton className="h-20 w-20 items-center" />
                                    <div className="flex flex-1 flex-col gap-2">
                                        <Skeleton className="h-2 w-4/5 items-center" />
                                        <Skeleton className="h-2 w-3/5 items-center" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 self-center">
                                    <Skeleton className="h-2 items-center" />
                                    <Skeleton className="h-2 w-4/5 items-center" />
                                </div>
                                <div className="flex flex-col gap-2 self-center">
                                    <Skeleton className="h-2 items-center" />
                                    <Skeleton className="h-2 w-4/5 items-center" />
                                </div>
                                <div className="flex flex-col gap-2 self-center">
                                    <Skeleton className="h-2 items-center" />
                                    <Skeleton className="h-2 w-4/5 items-center" />
                                </div>
                                <div className="flex flex-col gap-2 self-center">
                                    <Skeleton className="h-2 items-center" />
                                    <Skeleton className="h-2 w-4/5 items-center" />
                                </div>

                                <div className="flex flex-row items-center gap-6 self-center">
                                    <div className="flex flex-1 flex-shrink-0 flex-col gap-2">
                                        <Skeleton className="h-2 items-center" />
                                        <Skeleton className="h-2 w-4/5 items-center" />
                                    </div>
                                    <Skeleton className="h-2 w-4/5 flex-1 items-center" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
