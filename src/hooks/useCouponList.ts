import { CouponApi } from "@/apis";
import { useQuery } from "@tanstack/react-query";

const useCouponList = () => {
  const query = useQuery({
    queryKey: [`/coupons/list`],
    queryFn: CouponApi.getList,
  });

  return query;
};

export default useCouponList;
