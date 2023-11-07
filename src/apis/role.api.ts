import estoreApi from "./clients";
import { RoleListItem } from "./role.api.types";

const RoleApi = {
  getList: async (): Promise<RoleListItem[]> => {
    const result = await estoreApi.get("roles/list");
    return result.data?.items || [];
  },
};

export default RoleApi;
