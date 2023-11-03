import React from "react";
import type { MenuProps } from "antd";
import { Button, Layout, Menu, Spin } from "antd";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import { createStyles } from "antd-style";
import useStore from "@/store/store";
import { antdUtils } from "@/utils/antd.util";
import { useIsFetching } from "@tanstack/react-query";
import { last } from "lodash";

// 若是要在 Content 內顯示 Loading，則需要在 queryKey 中加入 contentLoadingEnable: true
interface ContentLoadingEnableQueryKey {
  contentLoadingEnable: boolean;
}

type MenuItem = Required<MenuProps>["items"][number];

const { Header, Content, Footer, Sider } = Layout;

const useStyle = createStyles(({ token }) => ({
  layout: {
    minHeight: "100vh",
  },
  header: {
    padding: 0,
    paddingRight: "1.5rem",
    background: token.colorBgContainer,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  contentWrapper: {
    background: token.colorBgContainer,
    margin: "1.5rem 1rem",
    padding: "1.5rem 1rem",
    position: "relative",
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
    }
  },
}));

const Menus: MenuItem[] = [];

const AdminLayout = () => {
  const { styles } = useStyle();
  const logout = useStore((state) => state.logout);

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
    <Layout className={styles.layout}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div style={{ margin: "12px" }}>
          <img src="https://via.placeholder.com/150x30" alt="logo" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map((icon, index) => ({
            key: String(index + 1),
            icon: React.createElement(icon),
            label: `nav ${index + 1}`,
          }))}
        />
      </Sider>
      <Layout>
        <Header className={styles.header}>
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
        <Content className={styles.contentWrapper}>
          <Spin spinning={isContentLoadingEnable} className={styles.contentLoading} />
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
