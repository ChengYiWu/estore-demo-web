import { useMutation } from "@tanstack/react-query";
import { antdUtils } from "@utils/antd.util";
import { OrderApi } from "@/apis";
import ErrorReponse from "@/types/commons/ErrorResponse";

import type { ChangeOrderStatusToCancelledRequest } from "@apis/order.api.types";

const useOrderStatusChangeToCancelled = (orderNo: string, refresh) => {
  const mutate = useMutation<string | void, ErrorReponse, ChangeOrderStatusToCancelledRequest>({
    mutationFn: (data) => OrderApi.changeOrderStatusToCancelled(orderNo, data),
    onSuccess: () => {
      refresh();
      antdUtils.message?.success({ content: "變更訂單狀態至已取消。" });
    },
  });

  return mutate;
};

export default useOrderStatusChangeToCancelled;
