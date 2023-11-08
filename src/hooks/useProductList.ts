import { ProductApi } from "@/apis";
import { useQuery } from "@tanstack/react-query";

const useProductList = () => {
  const query = useQuery({
    queryKey: [`/products/list`],
    queryFn: ProductApi.getList,
  });

  return query;
};

export default useProductList;
