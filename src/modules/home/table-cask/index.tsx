import HeadingContent from "@/components/shared/heading";
import ImagePlaceholder from "@/components/shared/image-placeholder";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
const invoices = [
    {
        rank: 1,
        name: "Bitfinex",
        lowestAsk: 29999.99,
        highestBid: 30000.01,
        volume: 1000000,
        change: 22,
        charts: "Charts",
        imgUrl: "/images/cask_mock.jpg",
    },
    {
        rank: 2,
        name: "Bitstamp",
        lowestAsk: 29999.99,
        highestBid: 30000.01,
        volume: 1000000,
        change: 22,
        charts: "Charts",
        imgUrl: "/images/cask_mock.jpg",
    },
    {
        rank: 3,
        name: "Coinbase",
        lowestAsk: 29999.99,
        highestBid: 30000.01,
        volume: 1000000,
        change: 22,
        charts: "Charts",
        imgUrl: "/images/cask_mock.jpg",
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
                        {invoices.map((invoice) => (
                            <TableRow
                                key={invoice.name}
                                className="grid grid-cols-[0.5fr_4.01818181818fr_1fr_1fr_1fr_1fr_2.2636363636fr] !gap-x-6 border-0"
                            >
                                <TableCell className="text-typo-body">
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
                                    ${invoice.lowestAsk}
                                </TableCell>
                                <TableCell className="text-base font-medium text-typo-primary">
                                    ${invoice.highestBid}
                                </TableCell>
                                <TableCell className="text-base font-medium text-typo-primary">
                                    ${invoice.volume}
                                </TableCell>
                                <TableCell className="text-base font-medium text-success">
                                    {invoice.change}%
                                </TableCell>
                                <TableCell>{invoice.charts}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
