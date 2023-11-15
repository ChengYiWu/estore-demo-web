import { OrderApi } from "@/apis";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useOrders = (condition) => {
  const query = useQuery({
    queryKey: ["orders", condition],
    queryFn: () => OrderApi.getOrders(condition),
    enabled: false,
  });

  const { refetch } = query;

  useEffect(() => {
    refetch();
  }, [condition, refetch]);

  return query;
};

export default useOrders;
