import { store } from "@/types/store";
import { StateCreator } from "zustand";

export const createAuthSlice: StateCreator<store.TAuth, [], []> = () => ({
    token: "",
});
