import { store } from "@/types/store";
import { StateCreator } from "zustand";

export const createCaskSlice: StateCreator<store.TCask, [], []> = () => ({
    setFilter: () => {},
    filter: "",
});
