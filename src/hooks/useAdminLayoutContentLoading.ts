import { useEffect } from "react";
import useStore from "@/store/store";

const useAdminLayoutContentLoading = (isLoading: boolean) => {
  const showContentLoading = useStore((state) => state.showContentLoading);
  const hideContentLoading = useStore((state) => state.hideContentLoading);

  useEffect(() => {
    if (isLoading) {
      showContentLoading();
    }
    return () => {
      if (isLoading) {
        hideContentLoading();
      }
    };
  }, [isLoading, showContentLoading, hideContentLoading]);
};

export default useAdminLayoutContentLoading;
