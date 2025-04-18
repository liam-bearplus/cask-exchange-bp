import { z } from "zod";
import { TUserSchema } from "./auth";
import {
    TCaskFilter,
    TCaskFilterCask,
    TCaskRangeType,
    TCaskSort,
    TCaskType,
} from "./cask";
import { filterSchema } from "@/lib/validators";
import { TDistillery } from "./distillery";

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace store {
    type TCask = {
        tags: TCaskFilterCask[] | [];
        caskTypes: TCaskType[];
        distilleries: TDistillery[];
        sortCask?: TCaskSort;
        isCancel: boolean;
        filterCask: z.infer<typeof filterSchema>;
        updateTags: () => void;
        updateSortCask: (sort: TCaskSort) => void;
        updateFilterCask: (filter: z.infer<typeof filterSchema>) => void;
        deleteTag: ({
            id,
            type,
        }: {
            id: string;
            type: TCaskFilter;
        }) => z.infer<typeof filterSchema>;
        updateCaskTypes: (caskTypes: TCaskType[]) => void;
        updateDistilleries: (distilleries: TDistillery[]) => void;
        setIsCancel: (isCancel: boolean) => void;
        clearTags: () => void;
        clearSortCask: () => void;
        clearFilterCask: () => void;
        clearAll: () => void;
    };
    type TAuth = {
        user: TUserSchema | null;
        isLogin: boolean;
        setMyUser: (user: TUserSchema) => void;
    };
}
