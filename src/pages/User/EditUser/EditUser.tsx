import { useEffect, useMemo } from "react";
import { Button, Form, Input, Select, Typography } from "antd";
import { createStyles } from "antd-style";
import { useParams } from "react-router-dom";
import AlertIfError from "@components/AlertIfError";
import useRoleList from "@hooks/useRoleList";
import { UserApi } from "@apis/index";
import useEditUser from "./useEditUser";

const { Title } = Typography;

interface FormValues {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  roles: string[];
}

const useStyles = createStyles(() => ({
  root: {
    border: "1px solid red",
    minHeight: "100%",
  },
  emailLabel: {
    margin: "0",
  },
}));

const EditUser = () => {
  const { styles } = useStyles();
  const { id = "" } = useParams<{ id: string }>();
  const isCreate = useMemo(() => !id, [id]);
  const { isError, error, data } = useEditUser(id, !isCreate);
  const {
    isError: isRoleListError,
    error: roleListError,
    data: roleList,
    isLoading: isRoleListLoading,
  } = useRoleList();

  const [form] = Form.useForm<FormValues>();

  useEffect(() => {
    if (data) {
      const formValues = {
        ...data,
        roles: data.roles.map((role) => role.id),
      };

      form.setFieldsValue(formValues);
    }
  }, [data, form]);

  const roleOptions = useMemo(() => {
    return roleList?.map((role) => ({ label: role.name, value: role.id })) || [];
  }, [roleList]);

  const handleFisih = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div className={styles.root}>
      <AlertIfError isError={isError} description={error?.message} />
      <AlertIfError isError={isRoleListError} description={roleListError?.message} />
      <div>
        <Form form={form} onFinish={handleFisih} colon={false} layout="vertical">
          <Form.Item
            name="email"
            label="電子信箱"
            // Notice: 避免太常觸發 Email 驗證 API
            validateFirst
            validateDebounce={500}
            hasFeedback
            rules={[
              {
                required: true,
                message: "請填寫電子信箱。",
              },
              {
                type: "email",
                message: "請填寫正確的電子信箱格式。",
              },
              {
                async validator(_, value) {
                  if (value) {
                    const isValid = await UserApi.checkUserEmail(value);
                    if (!isValid) {
                      return Promise.reject(new Error("電子信箱已被使用"));
                    }
                    return Promise.resolve();
                  }
                },
              },
            ]}
          >
            {isCreate ? (
              <Input placeholder="請輸入電子信箱" />
            ) : (
              <Title level={5} className={styles.emailLabel}>
                {data?.email}
              </Title>
            )}
          </Form.Item>
          <Form.Item
            name="userName"
            label="姓名"
            rules={[
              {
                required: true,
                message: "請填寫姓名。",
              },
            ]}
          >
            <Input placeholder="請輸入姓名" />
          </Form.Item>
          {isCreate && (
            <>
              <Form.Item
                name="password"
                label="密碼"
                rules={[
                  {
                    required: true,
                    message: "請填寫密碼。",
                  },
                ]}
              >
                <Input.Password placeholder="請輸入密碼" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="再次輸入密碼"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "請再次輸入密碼",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("兩次輸入的密碼不一致"));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="請再次輸入密碼" />
              </Form.Item>
            </>
          )}
          <Form.Item name="roles" label="指派角色">
            <Select mode="multiple" placeholder="請選擇角色" options={roleOptions} loading={isRoleListLoading} />
          </Form.Item>
          <Form.Item label="">
            <Button type="primary" htmlType="submit">
              儲存
            </Button>
          </Form.Item>
        </Form>
        <div>{JSON.stringify(data)}</div>
      </div>
    </div>
  );
};

export default EditUser;
