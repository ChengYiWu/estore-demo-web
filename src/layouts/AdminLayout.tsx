import React from "react";
import { Button, Layout, Menu } from "antd";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import { createStyles } from "antd-style";
import useStore from "@/store/store";

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
    margin: "24px 16px 0",
  },
  content: {
    background: token.colorBgContainer,
    minHeight: "100%",
  },
}));

const AdminLayout = () => {
  const logout = useStore((state) => state.logout);
  const { styles } = useStyle();

  return (
    <Layout className={styles.layout}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map((icon, index) => ({
            key: String(index + 1),
            icon: React.createElement(icon),
            label: `nav ${index + 1}`,
          }))}
        />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <Button type="primary" onClick={logout}>
            Logout
          </Button>
        </Header>
        <Content className={styles.contentWrapper}>
          <div className={styles.content}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
