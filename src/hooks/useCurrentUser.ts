import useStore from "@/store/store";
import { useMemo } from "react";

const useCurrentUser = () => {
  const token = useStore((state) => state.token);
  const user = useStore((state) => state.user);

  return useMemo(() => {
    return {
      ...user,
      token,
      isAdmin: user?.roles.some((role) => role.name === "Admin"),
    };
  }, [user, token]);
};

export default useCurrentUser;
