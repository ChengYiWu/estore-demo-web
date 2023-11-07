import { create } from "zustand";
import createAuthSlice, { AuthSlice } from "./auth.slice";
import createContentLoadingSlice, { ContentLoadingSlice } from "./contentLoading.slice";

type StoreType = AuthSlice & ContentLoadingSlice;

// 合併各 slice
// Ref: https://docs.pmnd.rs/zustand/guides/typescript#slices-pattern
const useStore = create<StoreType>()((...a) => ({
  ...createAuthSlice(...a),
  ...createContentLoadingSlice(...a),
}));

export default useStore;
