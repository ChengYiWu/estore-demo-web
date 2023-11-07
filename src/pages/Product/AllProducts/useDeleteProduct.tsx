import { ProductApi } from "@/apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { antdUtils } from "@utils/antd.util";
import useAdminLayoutContentLoading from "@/hooks/useAdminLayoutContentLoading";

const useSaveProduct = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (id: string) => ProductApi.deleteProduct(id),
    onSuccess: () => {
      antdUtils.message?.success({ content: "刪除商品成功。" });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const { isPending } = mutate;

  useAdminLayoutContentLoading(isPending);

  return mutate;
};

export default useSaveProduct;
