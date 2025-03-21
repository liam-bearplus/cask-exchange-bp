import { create } from "zustand";
import { createAuthSlice } from "./slices/authSlice";
import { createCaskSlice } from "./slices/caskSlice";
import { store } from "@/types/store";

export const useBoundStore = create<store.TAuth & store.TCask>((...a) => ({
    ...createAuthSlice(...a),
    ...createCaskSlice(...a),
}));
