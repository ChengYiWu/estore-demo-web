import estoreApi from "./clients";

const UserApi = {
  GetAllUsers: async () => {
    const result = await estoreApi.get("/users");
    return result.data;
  },
};

export default UserApi;
