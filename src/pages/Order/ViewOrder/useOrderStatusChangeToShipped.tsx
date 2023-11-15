import { useMutation } from "@tanstack/react-query";
import { antdUtils } from "@utils/antd.util";
import { OrderApi } from "@/apis";
import ErrorReponse from "@/types/commons/ErrorResponse";

const useOrderStatusChangeToShipped = (orderNo: string, refresh) => {
  const mutate = useMutation<string | void, ErrorReponse, void>({
    mutationFn: () => OrderApi.changeOrderStatusToShipped(orderNo),
    onSuccess: () => {
      refresh();
      antdUtils.message?.success({ content: "變更訂單狀態至已出貨。" });
    },
  });

  return mutate;
};

export default useOrderStatusChangeToShipped;
