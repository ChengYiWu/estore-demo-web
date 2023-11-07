import { StateCreator } from "zustand";

type State = {
  contentLoading: boolean;
  contentLoadingCount: number;
};

type Action = {
  showContentLoading: () => void;
  hideContentLoading: () => void;
};

export type ContentLoadingSlice = State & Action;

const initState: State = {
  contentLoading: false,
  contentLoadingCount: 0,
};

const createContentLoadingSlice: StateCreator<ContentLoadingSlice, [], [], ContentLoadingSlice> = (set) => ({
  ...initState,
  showContentLoading: () => {
    set((state) => {
      return { contentLoadingCount: state.contentLoadingCount + 1, contentLoading: true };
    });
  },
  hideContentLoading: () => {
    set((state) => {
      const remainCount = Math.max(state.contentLoadingCount - 1, 0);
      return { contentLoadingCount: remainCount, contentLoading: remainCount > 0 };
    });
  },
});

export default createContentLoadingSlice;
