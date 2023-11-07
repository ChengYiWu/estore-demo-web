import estoreApi from "./clients";
import type { loginRequest, loginResponse } from "./auth.api.types";

const AuthApi = {
  login: async (info: loginRequest): Promise<loginResponse> => {
    const result = await estoreApi.post("/auth/login", info);
    return result.data;
  },
};

export default AuthApi;
