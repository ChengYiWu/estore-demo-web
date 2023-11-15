import { UserApi } from "@/apis";
import { useQuery } from "@tanstack/react-query";

const useUserList = () => {
  const query = useQuery({
    queryKey: [`/users/list`],
    queryFn: UserApi.getList,
  });

  return query;
};

export default useUserList;
