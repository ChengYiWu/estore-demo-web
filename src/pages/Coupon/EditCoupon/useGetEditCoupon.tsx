import { CouponApi } from "@/apis";
import useAdminLayoutContentLoading from "@/hooks/useAdminLayoutContentLoading";
import { useQuery } from "@tanstack/react-query";

const useGetEditProduct = (id: string, isEdit: boolean = true) => {
  const query = useQuery({
    queryKey: [`/coupons/${id}`],
    queryFn: () => CouponApi.getCoupon(id),
    enabled: isEdit,
  });

  useAdminLayoutContentLoading(query.isLoading);

  return query;
};

export default useGetEditProduct;
