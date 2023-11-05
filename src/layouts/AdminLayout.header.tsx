import useStore from "@/store/store";
import { antdUtils } from "@/utils/antd.util";
import { Button, Layout } from "antd";
import { createStyles } from "antd-style";

const { Header } = Layout;

const useStyle = createStyles(({ token }) => ({
  root: {
    padding: 0,
    paddingRight: "1.5rem",
    background: token.colorBgContainer,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));

const AdminLayoutHeader = () => {
  const { styles } = useStyle();
  const logout = useStore((state) => state.logout);

  return (
    <Header className={styles.root}>
      <Button
        type="primary"
        onClick={() => {
          logout(() => {
            setTimeout(() => {
              antdUtils.notification?.success({
                message: "登出成功",
                placement: "bottomRight",
                duration: 2,
              });
            });
          });
        }}
      >
        登出
      </Button>
    </Header>
  );
};

export default AdminLayoutHeader;
