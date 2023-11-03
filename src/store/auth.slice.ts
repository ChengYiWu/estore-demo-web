import { AuthApi } from "@/apis";
import { StateCreator } from "zustand";
import ErrorResponse from "@/types/commons/ErrorResponse";
import { AxiosError } from "axios";
import { antdUtils } from "@utils/antd.util";
import { isNil } from "lodash";

type State = {
  token: string | null;
  loginProcessing: boolean;
  isAuth: boolean;
};

type Action = {
  login: (email: string, password: string) => Promise<void>;
  logout: (onSuccess?: () => void) => void;
};

export type AuthSlice = State & Action;

const initState: State = {
  token: localStorage.getItem("token") || null,
  loginProcessing: false,
  isAuth: !isNil(localStorage.getItem("token")),
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
  logout: (onSuccess) => {
    localStorage.removeItem("token");
    set(initState);

    onSuccess && onSuccess();
  },
});

export default createAuthSlice;
