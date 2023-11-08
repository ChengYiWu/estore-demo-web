import { CouponApi } from "@/apis";
import { useMutation } from "@tanstack/react-query";
import ErrorReponse from "@/types/commons/ErrorResponse";
import { useNavigate } from "react-router-dom";
import { Routes } from "@/layouts/routes";
import { antdUtils } from "@utils/antd.util";
import useAdminLayoutContentLoading from "@/hooks/useAdminLayoutContentLoading";
import { CreateCouponRequest, UpdateCouponRequest } from "@apis/coupon.api.types";

export type SaveCouponRequest = CreateCouponRequest | UpdateCouponRequest;

const useSaveCoupon = (id: string, isCreate: boolean) => {
  const navigate = useNavigate();

  const mutate = useMutation<string | void, ErrorReponse, SaveCouponRequest>({
    mutationFn: (data) => {
      if (isCreate) {
        return CouponApi.createCoupon(data as CreateCouponRequest);
      } else {
        return CouponApi.updateCoupon(id, data as UpdateCouponRequest);
      }
    },
    onSuccess: () => {
      if (isCreate) {
        navigate(Routes.AllCoupons.path);
        antdUtils.notification?.success({ message: "新增優惠券成功。", placement: "bottomRight" });
      } else {
        antdUtils.message?.success({ content: "更新優惠券成功。" });
      }
    },
  });

  const { isPending } = mutate;

  useAdminLayoutContentLoading(isPending);

  return mutate;
};

export default useSaveCoupon;
