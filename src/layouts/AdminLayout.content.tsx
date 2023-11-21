import { Spin, Layout } from "antd";
import { createStyles } from "antd-style";
import { Outlet } from "react-router-dom";
import useStore from "@/store/store";

const { Content } = Layout;

const useStyle = createStyles(() => ({
  contentLoading: {
    height: "100%",
    "& .ant-spin-container": {
      height: "100%",
    },
  },
}));

const AdminLayoutContent = () => {
  const { styles } = useStyle();
  // 檢查 store 是否有任何要 loading 的狀態
  const isContentLoading = useStore((state) => state.contentLoading);

  return (
    <Content>
      <Spin spinning={isContentLoading} wrapperClassName={styles.contentLoading}>
        <Outlet />
      </Spin>
    </Content>
  );
};

export default AdminLayoutContent;
