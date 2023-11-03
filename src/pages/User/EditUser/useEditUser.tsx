import { UserApi } from "@/apis";
import { useQuery } from "@tanstack/react-query";

const useEditUser = (id: string, isEdit: boolean = true) => {
  const query = useQuery({
    queryKey: [`/users/${id}`, { contentLoadingEnable: true }],
    queryFn: () => UserApi.getUser(id),
    enabled: isEdit,
  });
  return query;
};

export default useEditUser;
