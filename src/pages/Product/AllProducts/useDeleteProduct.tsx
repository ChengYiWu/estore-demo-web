import { ProductApi } from "@/apis";
import { useMutation } from "@tanstack/react-query";
import { antdUtils } from "@utils/antd.util";
import useAdminLayoutContentLoading from "@/hooks/useAdminLayoutContentLoading";

const useDeleteProduct = (refreshProducts) => {
  const mutate = useMutation({
    mutationFn: (id: string) => ProductApi.deleteProduct(id),
    onSuccess: () => {
      antdUtils.message?.success({ content: "刪除商品成功。" });
      refreshProducts();
    },
  });

  const { isPending } = mutate;

  useAdminLayoutContentLoading(isPending);

  return mutate;
};

export default useDeleteProduct;
