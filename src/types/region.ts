import { global } from "./global/global";

export type TRegion = {
    country: string;
    description: string;
} & global.TDataWithFields;

export type TRegionCreateInput = Omit<
    TRegion & {
        subRegion: string;
        climate: string;
        terroir: string;
    },
    "id" | "createdAt" | "updatedAt"
>;
