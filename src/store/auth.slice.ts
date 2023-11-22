import { AuthApi } from "@/apis";
import { StateCreator } from "zustand";
import ErrorResponse from "@/types/commons/ErrorResponse";
import { AxiosError } from "axios";
import { antdUtils } from "@utils/antd.util";
import { isNil } from "lodash";
import { AuthUser } from "@/apis/auth.api.types";
import router from "@utils/router.util";

type State = {
  token: string | null;
  user: AuthUser | null;
  loginProcessing: boolean;
  isAuth: boolean;
};

type Action = {
  login: (email: string, password: string) => Promise<void>;
  logout: (onSuccess?: () => void) => void;
};

export type AuthSlice = State & Action;

export const STOREAGE_KEYS = {
  USER: "user",
  TOKEN: "token",
};

const initState: State = {
  user: localStorage.getItem(STOREAGE_KEYS.USER) ? JSON.parse(localStorage.getItem(STOREAGE_KEYS.USER)!) : null,
  token: localStorage.getItem(STOREAGE_KEYS.TOKEN) || null,
  loginProcessing: false,
  isAuth: !isNil(localStorage.getItem(STOREAGE_KEYS.TOKEN)),
};

const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (set) => ({
  ...initState,
  login: async (email, password) => {
    try {
      set({ loginProcessing: true });
      const data = await AuthApi.login({ email, password });
      localStorage.setItem(STOREAGE_KEYS.TOKEN, data.token);
      localStorage.setItem(STOREAGE_KEYS.USER, JSON.stringify(data.user));
      set({ token: data.token, user: data.user, isAuth: data.token !== null });
    } catch (e) {
      antdUtils.message?.error((e as AxiosError<ErrorResponse>)?.message || "登入失敗");
    } finally {
      set({ loginProcessing: false });
    }
  },
  logout: (onSuccess) => {
    localStorage.removeItem(STOREAGE_KEYS.TOKEN);
    localStorage.removeItem(STOREAGE_KEYS.USER);
    set({ token: null, user: null, isAuth: false });

    onSuccess && onSuccess();

    router.navigate("/login");
  },
});

export default createAuthSlice;
