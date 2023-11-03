import { Navigate } from "react-router-dom";
import useStore from "@store/index";
import { Alert, Button, Form, Input } from "antd";
import { createStyles } from "antd-style";
import { antdUtils } from "@utils/antd.util";
import { useEffect } from "react";

interface FormValues {
  email: string;
  password: string;
}

const useStyle = createStyles(({ token }) => ({
  root: {
    height: "100vh",
    background: token.colorBgBlur,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "clamp(15rem, 50%, 25rem)",
    padding: "1rem",
    border: "1px solid red",
    flexDirection: "column",
    gap: "1rem",
  },
  info: {
    border: "1px solid red",
  },
  form: {
    width: "100%",
  },
}));

const LoginLayout = () => {
  const isAuth = useStore((state) => state.isAuth);
  const loginProcessing = useStore((state) => state.loginProcessing);
  const login = useStore((state) => state.login);
  const { styles } = useStyle();

  useEffect(() => {
    if (isAuth) {
      antdUtils.notification?.success({
        message: "登入成功",
        description: "歡迎回來",
        placement: "bottomRight",
        duration: 2,
      });
    }
  }, [isAuth]);

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  const handleFisih = (value: FormValues) => {
    login(value.email, value.password);
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.info}>
          <img src="https://picsum.photos/300/100" alt="" />
          <Alert
            message="Info Text"
            description="Info Description Info Description Info Description Info Description"
            type="info"
          />
        </div>
        <Form
          name="loginForm"
          onFinish={handleFisih}
          rootClassName={styles.form}
          initialValues={{
            email: "chris@example.com",
            password: "123456",
          }}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="電子信箱"
            rules={[
              {
                required: true,
                message: "請填寫電子信箱。",
              },
              {
                type: "email",
                message: "請填寫正確的電子信箱格式。",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
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
            <Input.Password type="" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loginProcessing}>
              登入
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginLayout;
