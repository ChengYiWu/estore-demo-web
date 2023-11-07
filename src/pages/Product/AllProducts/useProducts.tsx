import { ProductApi } from "@/apis";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useProducts = (condition) => {
  const query = useQuery({
    queryKey: ["products", condition],
    queryFn: () => ProductApi.getProducts(condition),
    enabled: false,
  });

  const { refetch } = query;

  useEffect(() => {
    refetch();
  }, [condition, refetch]);

  return query;
};

export default useProducts;
