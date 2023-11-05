import useStore from "@/store/store";
import { useMemo } from "react";

const useCurrentUser = () => {
  const user = useStore((state) => state.user);

  return useMemo(() => {
    return {
      ...user,
      isAdmin: user.roles.some((role) => role.name === "Admin"),
    };
  }, [user]);
};

export default useCurrentUser;
