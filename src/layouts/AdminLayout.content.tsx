import { Spin, Layout } from "antd";
import { createStyles } from "antd-style";
import { Outlet } from "react-router-dom";
import useStore from "@/store/store";

const { Content } = Layout;

const useStyle = createStyles(({ token }) => ({
  root: {
    background: token.colorBgContainer,
    margin: "1rem",
    padding: "1.5rem 1rem",
    position: "relative",
    boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
    // border: "1px solid red",
  },
  contentLoading: {
    "&.ant-spin-spinning": {
      position: "absolute",
      inset: 0,
      zIndex: token.zIndexPopupBase,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "rgba(255, 255, 255, .6)",
    },
  },
}));

const AdminLayoutContent = () => {
  const { styles } = useStyle();

  // 檢查 store 是否有任何要 loading 的狀態
  const isContentLoading = useStore((state) => state.contentLoading);

  return (
    <Content className={styles.root}>
      <Spin spinning={isContentLoading} className={styles.contentLoading} />
      <Outlet />
    </Content>
  );
};

export default AdminLayoutContent;
