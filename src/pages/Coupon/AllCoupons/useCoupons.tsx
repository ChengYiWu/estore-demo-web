import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { CouponApi } from "@/apis";

const useCoupons = (condition, setCondition) => {
  const query = useQuery({
    queryKey: ["coupons", condition],
    queryFn: () => CouponApi.getCoupons(condition),
    enabled: false,
  });

  const { refetch, data } = query;

  useEffect(() => {
    refetch();
  }, [condition, refetch]);

  // 避免刪除最後一筆資料時，頁面沒有資料的情況
  useEffect(() => {
    if (data) {
      if (data.hasPreviousPage && data.items.length === 0) {
        setCondition((prev) => ({ ...prev, pageNumber: data.pageNumber - 1 }));
      }
    }
  }, [data, setCondition]);

  return query;
};

export default useCoupons;
