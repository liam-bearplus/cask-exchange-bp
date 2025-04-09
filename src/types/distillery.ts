import { global } from "./global/global";

export type TDistillery = {
    description: string;
    name: string;
    region: string;
    website: string;
} & global.TDataWithFields;
