import { ProductApi } from "@/apis";
import { CreateProductRequest, UpdateProductRequest } from "@/apis/product.api.types";
import { useMutation } from "@tanstack/react-query";
import ErrorReponse from "@/types/commons/ErrorResponse";
import { useNavigate } from "react-router-dom";
import { Routes } from "@/layouts/routes";
import { antdUtils } from "@utils/antd.util";
import useAdminLayoutContentLoading from "@/hooks/useAdminLayoutContentLoading";

type SaveProductRequest = CreateProductRequest | UpdateProductRequest;

const useSaveProduct = (id: string, isCreate: boolean) => {
  const navigate = useNavigate();

  const mutate = useMutation<string | void, ErrorReponse, SaveProductRequest>({
    mutationFn: (data) => {
      if (isCreate) {
        return ProductApi.createProduct(data as CreateProductRequest);
      } else {
        return ProductApi.updateProduct(id, data as UpdateProductRequest);
      }
    },
    onSuccess: () => {
      if (isCreate) {
        navigate(Routes.AllProducts.path);
        antdUtils.notification?.success({ message: "新增商品成功。", placement: "bottomRight" });
      } else {
        antdUtils.message?.success({ content: "更新商品成功。" });
      }
    },
  });

  const { isPending } = mutate;

  useAdminLayoutContentLoading(isPending);

  return mutate;
};

export default useSaveProduct;
