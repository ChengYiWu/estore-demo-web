import { UserApi } from "@/apis";
import useAdminLayoutContentLoading from "@/hooks/useAdminLayoutContentLoading";
import { useQuery } from "@tanstack/react-query";

const useGetEditUser = (id: string, isEdit: boolean = true) => {
  const query = useQuery({
    queryKey: [`/users/${id}`],
    queryFn: () => UserApi.getUser(id),
    enabled: isEdit,
  });

  useAdminLayoutContentLoading(query.isLoading);

  return query;
};

export default useGetEditUser;
