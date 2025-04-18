import { store } from "@/types/store";
import { StateCreator } from "zustand";

const initValue = {
    user: null,
    isLogin: false,
};

export const createAuthSlice: StateCreator<store.TAuth, [], []> = (
    set,
    _get
) => ({
    user: null,
    isLogin: false,
    setMyUser: (user) => {
        set({ user, isLogin: !!user });
    },
    reset() {
        set(initValue);
    },
});
