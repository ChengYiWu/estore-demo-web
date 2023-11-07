import { ProductApi } from "@/apis";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useProducts = (condition, setCondition) => {
  const query = useQuery({
    queryKey: ["products", condition],
    queryFn: () => ProductApi.getProducts(condition),
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

export default useProducts;
