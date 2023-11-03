import estoreApi from "./clients";
import { getUsersResponse, getUserResponse } from "./user.api.types";

const UserApi = {
  getUsers: async (): Promise<getUsersResponse> => {
    const result = await estoreApi.get("/users");
    return result.data;
  },
  getUser: async (id: string): Promise<getUserResponse> => {
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({
    //       id: "e17c51d1-7339-449d-98a9-f87794ce8641",
    //       userName: "Admin",
    //       email: "admin@example.com",
    //       roles: [
    //         {
    //           id: 
    //           name: "Admin",
    //         },
    //         {
    //           name: "Manager",
    //         },
    //       ],
    //     });
    //   }, 1000);
    // });
    const result = await estoreApi.get(`/users/${id}`);
    return result.data;
  },
  checkUserEmail: async (email: string): Promise<boolean> => {
    const result = await estoreApi.post(`/users/validEmail`, { email });
    return result.data;
  },
};

export default UserApi;
