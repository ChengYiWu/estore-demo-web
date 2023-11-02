import { UserApi } from "@/apis";
import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  const query = useQuery({ queryKey: ["todos"], queryFn: UserApi.getUsers });
  return query;
};

export default useUsers;
