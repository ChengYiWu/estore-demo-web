import estoreApi from "./clients";
import { getUsersResponse, getUserResponse, CreateUserRequest, UpdateUserRequest, GetUserListResponse } from "./user.api.types";

const UserApi = {
  getList: async (): Promise<GetUserListResponse> => {
    const result = await estoreApi.get("/users/list");
    return result.data;
  },
  getUsers: async (condition): Promise<getUsersResponse> => {
    const result = await estoreApi.get("/users", { params: condition });
    return result.data;
  },
  getUser: async (id: string): Promise<getUserResponse> => {
    const result = await estoreApi.get(`/users/${id}`);
    return result.data;
  },
  checkUserEmail: async (email: string): Promise<boolean> => {
    const result = await estoreApi.post(`/users/validEmail`, { email });
    return result.data;
  },
  createUser: async (data: CreateUserRequest): Promise<string> => {
    const result = await estoreApi.post(`/users`, data);
    return result.data;
  },
  updateUser: async (id: string, data: UpdateUserRequest): Promise<void> => {
    const result = await estoreApi.put(`/users/${id}`, data);
    return result.data;
  },
};

export default UserApi;
