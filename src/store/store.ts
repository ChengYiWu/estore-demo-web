import { create } from "zustand";
import createAuthSlice, { AuthSlice } from "./auth.slice";

// 合併各 slice
// Ref: https://docs.pmnd.rs/zustand/guides/typescript#slices-pattern
const useStore = create<AuthSlice>()((...a) => ({
  ...createAuthSlice(...a),
}));

export default useStore
