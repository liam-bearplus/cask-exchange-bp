import {
    DATA_FILTER_CASKS,
    filterCaskValDefault,
    RULE_TAGS_CASK,
} from "@/lib/constants";
import { isEmpty } from "@/lib/utils";
import { filterSchema } from "@/lib/validators";
import { TCaskFilter, TCaskFilterCask } from "@/types";
import { store } from "@/types/store";
import { z } from "zod";
import { StateCreator } from "zustand";

const initialState = {
    tags: [],
    isCancel: false,
    filterCask: filterCaskValDefault,
    sortCask: undefined,
};

export const createCaskSlice: StateCreator<store.TCask, [], []> = (
    set,
    get
) => ({
    ...initialState,
    distilleries: [],
    caskTypes: [],
    setIsCancel: (isCancel) => {
        set({ isCancel });
    },
    updateDistilleries: (distilleries) => {
        set({ distilleries });
    },
    updateCaskTypes: (caskTypes) => {
        set({ caskTypes });
    },
    updateTags: () => {
        set((state) => {
            const cloneFilters = { ...state.filterCask };
            const tagsGenerate = Object.entries(cloneFilters).reduce(
                (
                    acc: TCaskFilterCask[],
                    [key, values]: [
                        TCaskFilter,
                        string[] | (number | undefined)[],
                    ]
                ) => {
                    if (isEmpty(values)) return acc;

                    let contentValue = "";
                    if (key === "caskType" || key === "distillery") {
                        const matchData =
                            key === "caskType"
                                ? state.caskTypes
                                : state.distilleries;

                        if (Array.isArray(values)) {
                            values.forEach((val) => {
                                if (val !== "all") {
                                    const valueMatch = matchData.find(
                                        (item) => item.id === val
                                    );
                                    acc.push({
                                        label: RULE_TAGS_CASK[
                                            key as keyof typeof RULE_TAGS_CASK
                                        ].label,
                                        id: valueMatch?.id,
                                        value: valueMatch?.name,
                                        type: key, // Add the typ
                                    });
                                }
                            });
                        }
                    } else {
                        const [min, max] = values;
                        const rule =
                            RULE_TAGS_CASK[key as keyof typeof RULE_TAGS_CASK];
                        const unit = rule.unit;
                        const isUnitPrefix = unit?.position === "prefix";
                        const unitVal = unit?.value || "";

                        const formatValue = (
                            value: number | string | undefined
                        ) => {
                            if (!value) return "";
                            return isUnitPrefix
                                ? `${unitVal}${value}`
                                : `${value}${unitVal}`;
                        };

                        const minWithUnit = formatValue(min);

                        const maxWithUnit = formatValue(max);

                        if (min && max) {
                            contentValue = `${minWithUnit} - ${maxWithUnit}`;
                        } else if (min) {
                            contentValue = `Over ${minWithUnit}`;
                        } else if (max) {
                            contentValue = `Under ${maxWithUnit}`;
                        }

                        acc.push({
                            label: rule.label,
                            id: `${key}-${min}-${max}`,
                            value: contentValue,
                            type: key,
                        });
                    }

                    return acc;
                },
                []
            );
            return { ...state, tags: tagsGenerate };
        });
    },
    deleteTag: ({ id, type }) => {
        set((state) => {
            let filterTags = [...state.tags];
            let filterArray: z.infer<typeof filterSchema> = {
                ...state.filterCask,
            };

            if (type === "caskType" || type === "distillery") {
                if (Array.isArray(filterArray[type])) {
                    filterArray = {
                        ...filterArray,
                        [type]: filterArray[type].filter((item) => item !== id),
                    };
                }
            } else {
                filterArray = {
                    ...filterArray,
                    [type]: [],
                };
            }
            filterTags = filterTags.filter(
                (item) => item.type !== type || item.id !== id
            );

            return {
                ...state,
                tags: filterTags,
                filterCask: filterArray,
            };
        });

        return get().filterCask;
    },
    updateFilterCask: (filter) => {
        set((state) => {
            return { ...state, filterCask: filter };
        });
        get().updateTags();
    },
    updateSortCask: (sort) => {
        set({ sortCask: sort });
    },
    clearTags: () => {
        set({ tags: [] });
    },
    clearSortCask: () => {
        set({ sortCask: undefined });
    },
    clearFilterCask: () => {
        set({ filterCask: DATA_FILTER_CASKS });
    },

    clearAll: () => {
        set(initialState);
    },
});
