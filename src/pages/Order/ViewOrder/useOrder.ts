import { useEffect } from "react";
import { OrderApi } from "@/apis";
import { useQuery } from "@tanstack/react-query";

const useOrder = (orderNo: string) => {
  const query = useQuery({
    queryKey: [`orders/${orderNo}`],
    queryFn: () => OrderApi.getOrder(orderNo),
    enabled: false,
  });

  const { refetch } = query;

  useEffect(() => {
    if (orderNo) {
      refetch();
    }
  }, [orderNo, refetch]);

  return query;
};

export default useOrder;
