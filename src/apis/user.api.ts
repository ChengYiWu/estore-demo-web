import estoreApi from "./clients";
import { getUsersResponse } from "./user.api.types";

const UserApi = {
  getUsers: async (): Promise<getUsersResponse> => {
    const result = await estoreApi.get("/users");
    return result.data;
  },
};

export default UserApi;
