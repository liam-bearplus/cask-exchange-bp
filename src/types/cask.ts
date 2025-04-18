import { TUserSchema } from "./auth";
import { TDistillery } from "./distillery";
import { global } from "./global/global";
import { TRegion } from "./region";
export type TCask = {
    caskReference: string;
    name: string;
    distillery: TDistillery;
    distilleryId: string;
    distillationDate: string;
    vintageYear: number;
    expectedMaturityDate: Date | null;
    ola: number;
    rla: number;
    abv: string;
    estimatedBottleCount: number;
    initialValuation: number;
    currentValuation: string;
    currency: string;
    isVerified: boolean;
    verificationDate: Date | null;
    isListed: boolean;
    listingDate: Date | null;
    caskStatus: CaskStatus;
    description: string | null;
    tastingNotes: string | null;
    storageLocation: string | null;
    imageUrl: string;
    caskTypeId: string;
    classificationId: string;
    caskType: TCaskType;
    // classification: Classification;
    // spiritType: SpiritType;
    region: TRegion;
    regionId: string;
    spiritTypeId: string;
    verifications: TCaskVerification[];
    priceHistory: TCaskPriceHistory[];
    owner: TUserSchema;
    ownerId: string | null;
} & global.TDataWithFields;

export type TCaskType = {
    name: string;

    typicalCapacityLiters: null | string;
    description: string | null;
} & global.TDataWithFields;
export type TCaskRangeType = {
    abv: { min: number; max: number };
    estimatedBottleCount: { min: number; max: number };
    ola: { min: number; max: number };
    price: { min: number; max: number };
    rla: { min: number; max: number };
    vintageYear: { min: number; max: number };
};
export type TCaskSort = {
    name: string;
    value: string;
    defaultOrder: string;
    description: string;
};
export type CaskCreateInput = Omit<
    TCask,
    | "id"
    | "createdAt"
    | "updatedAt"
    | "verifications"
    | "priceHistory"
    | "distillery"
    | "caskType"
    | "classification"
    | "region"
    | "spiritType"
    | "owner"
> & {
    distilleryId: string;
    caskTypeId: string;
    classificationId: string;
    regionId: string;
    spiritTypeId: string;
    ownerId?: string | null;
};
export type TCaskPriceHistory = TCask & {
    price: number;
    currency: string;
    volumeLiters: number;
};

export type TCaskVerification = TCask & {
    verificationDate: Date | null;
    verifiedBy: string;
    verificationReport: string;
    nextVerificationDate: Date;
    isVerified: boolean;
};

export enum CaskStatus {
    ACTIVE = "active",
    SOLD = "sold",
    RESERVED = "reserved",
    WITHDRAWN = "withdrawn",
    BOTTLED = "bottled",
}
export type TCaskFilterCask = {
    label?: string;
    value?: string | number;
    id?: string;
    type: TCaskFilter;
};

export type TCaskFilter = string;
