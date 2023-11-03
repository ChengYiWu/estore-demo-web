import { RoleApi } from "@/apis";
import { useQuery } from "@tanstack/react-query";

const useRoleList = () => {
  const query = useQuery({
    queryKey: [`/roles/list`],
    queryFn: RoleApi.getList,
  });
  
  return query;
};

export default useRoleList;
