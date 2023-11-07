import { UserApi } from "@/apis";
import { CreateUserRequest, UpdateUserRequest } from "@/apis/user.api.types";
import { useMutation } from "@tanstack/react-query";
import ErrorReponse from "@/types/commons/ErrorResponse";
import { useNavigate } from "react-router-dom";
import { Routes } from "@/layouts/routes";
import { antdUtils } from "@utils/antd.util";

type SaveUserRequest = CreateUserRequest | UpdateUserRequest;

const useSaveUser = (id: string, isCreate: boolean) => {
  const navigate = useNavigate();
  return useMutation<string | void, ErrorReponse, SaveUserRequest>({
    mutationFn: (data) => {
      if (isCreate) {
        return UserApi.createUser(data as CreateUserRequest);
      } else {
        return UserApi.updateUser(id, data as UpdateUserRequest);
      }
    },
    onSuccess: () => {
      if (isCreate) {
        navigate(Routes.AllUsers.path);
        antdUtils.notification?.success({ message: "新增使用者成功。", placement: "bottomRight" });
      } else {
        antdUtils.message?.success({ content: "更新使用者成功。" });
      }
    },
  });
};

export default useSaveUser;
