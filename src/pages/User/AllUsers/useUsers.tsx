import { UserApi } from "@/apis";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useUsers = (condition) => {
  const query = useQuery({
    queryKey: ["users", condition],
    queryFn: () => UserApi.getUsers(condition),
    enabled: false,
  });

  const { refetch } = query;

  useEffect(() => {
    refetch();
  }, [condition, refetch]);

  return query;
};

export default useUsers;
