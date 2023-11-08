import { useMutation } from "@tanstack/react-query";
import { CouponApi } from "@/apis";
import { antdUtils } from "@utils/antd.util";
import useAdminLayoutContentLoading from "@/hooks/useAdminLayoutContentLoading";

const useDeleteCoupon = (refreshCoupons) => {
  const mutate = useMutation({
    mutationFn: (id: string) => CouponApi.deleteCoupon(id),
    onSuccess: () => {
      antdUtils.message?.success({ content: "刪除優惠券成功。" });
      refreshCoupons();
    },
  });

  const { isPending } = mutate;

  useAdminLayoutContentLoading(isPending);

  return mutate;
};

export default useDeleteCoupon;
