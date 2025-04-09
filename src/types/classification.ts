import { global } from "./global/global";

export type TClassification = {
    name: string;
    description: string;
} & global.TDataWithFields;
