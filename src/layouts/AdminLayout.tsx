import React from "react";
import type { MenuProps } from "antd";
import { Layout } from "antd";
import { createStyles } from "antd-style";
import AdminLayoutHeader from "./AdminLayout.header";
import AdminLayoutContent from "./AdminLayout.content";
import AdminLayoutFooter from "./AdminLayout.footer";
import AdminLayoutSider from "./AdminLayout.sider";

const useStyle = createStyles(() => ({
  root: {
    minHeight: "100vh",
  },
}));

const AdminLayout = () => {
  const { styles } = useStyle();

  return (
    <Layout className={styles.root}>
      <AdminLayoutSider />
      <Layout>
        <AdminLayoutHeader />
        <AdminLayoutContent />
        <AdminLayoutFooter />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
