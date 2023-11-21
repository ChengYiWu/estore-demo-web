import { Spin, Layout } from "antd";
import { Outlet } from "react-router-dom";
import useStore from "@/store/store";

const { Content } = Layout;

const AdminLayoutContent = () => {
  // 檢查 store 是否有任何要 loading 的狀態
  const isContentLoading = useStore((state) => state.contentLoading);

  return (
    <Content>
      <Spin spinning={isContentLoading}>
        <Outlet />
      </Spin>
    </Content>
  );
};

export default AdminLayoutContent;
