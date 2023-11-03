import { AuthApi } from "@/apis";
import { StateCreator } from "zustand";
import ErrorResponse from "@/types/commons/ErrorResponse";
import { AxiosError } from "axios";
import { antdUtils } from "@utils/antd.util";

type State = {
  token: string | null;
  loginProcessing: boolean;
  isAuth: boolean;
};

type Action = {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export type AuthSlice = State & Action;

const initState: State = {
  token: localStorage.getItem("token") || null,
  loginProcessing: false,
  isAuth: false,
};

const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (set) => ({
  ...initState,
  login: async (email, password) => {
    try {
      set({ loginProcessing: true });
      const data = await AuthApi.login({ email, password });
      localStorage.setItem("token", data.token);
      set({ token: data.token, isAuth: data.token !== null });
    } catch (e) {
      antdUtils.message?.error((e as AxiosError<ErrorResponse>).response?.data.detail || "登入失敗");
    } finally {
      set({ loginProcessing: false });
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    return set(initState);
  },
});

export default createAuthSlice;
