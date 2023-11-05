import useStore from "@/store/store";
import { useIsFetching } from "@tanstack/react-query";
import { Spin, Layout } from "antd";
import { createStyles } from "antd-style";
import { last } from "lodash";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

// 若是要在 Content 內顯示 Loading，則需要在 queryKey 中加入 contentLoadingEnable: true
interface ContentLoadingEnableQueryKey {
  contentLoadingEnable: boolean;
}

const useStyle = createStyles(({ token }) => ({
  root: {
    background: token.colorBgContainer,
    margin: "1rem",
    padding: "1.5rem 1rem",
    position: "relative",
    border: "1px solid red",
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

  // 檢查是否有任何正在 query 且要在 Content 內顯示 Loading 的 query
  const isFetching = useIsFetching({
    predicate: (query) => {
      const lastKey = last(query.queryKey) as ContentLoadingEnableQueryKey;
      return lastKey?.contentLoadingEnable;
    },
  });

  const isContentLoadingEnable = isContentLoading || isFetching > 0;

  return (
    <Content className={styles.root}>
      <Spin spinning={isContentLoadingEnable} className={styles.contentLoading} />
      <Outlet />
    </Content>
  );
};

export default AdminLayoutContent;
