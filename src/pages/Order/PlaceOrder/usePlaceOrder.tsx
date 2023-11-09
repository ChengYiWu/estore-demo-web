import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { antdUtils } from "@utils/antd.util";
import routeUtil from "@utils/route.util";
import { OrderApi } from "@/apis";
import useAdminLayoutContentLoading from "@/hooks/useAdminLayoutContentLoading";
import ErrorReponse from "@/types/commons/ErrorResponse";
import { Routes } from "@/layouts/routes";

import type { PlaceOrderRequest } from "@apis/order.api.types";

const usePlaceOrder = () => {
  const navigate = useNavigate();

  const mutate = useMutation<string | void, ErrorReponse, PlaceOrderRequest>({
    mutationFn: (data) => OrderApi.placeOrder(data),
    onSuccess: () => {
      navigate(routeUtil.getRoutePath(Routes.AllOrders));
      antdUtils.notification?.success({ message: "建立訂單成功。", placement: "bottomRight" });
    },
  });

  const { isPending } = mutate;

  useAdminLayoutContentLoading(isPending);

  return mutate;
};

export default usePlaceOrder;
