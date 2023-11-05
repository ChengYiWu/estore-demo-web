import { Menu, Layout } from "antd";
import type { MenuProps } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Sitemap } from "./sitemap.types";
import { SitemapList } from "./sitemap";
import sitemapUtil from "@/utils/sitemap.util";

type MenuItem = Required<MenuProps>["items"][number];

const { Sider } = Layout;

function ConverSitemapListToMenus(sitemapList: Sitemap[]): MenuItem[] {
  const menus: MenuItem[] = [];
  sitemapList.forEach((sitemap) => {
    if (sitemap.showInMenu) {
      const isAnyChildShowInMenu = sitemap.children?.some((child) => child.showInMenu) || false;
      const menu = {
        key: sitemap.key,
        icon: sitemap.icon,
        label: sitemap.route ? <Link to={sitemap.route.path}>{sitemap.label}</Link> : sitemap.label,
        children: sitemap.children && isAnyChildShowInMenu ? ConverSitemapListToMenus(sitemap.children) : null,
      };
      menus.push(menu as MenuItem);
    }
  });
  return menus;
}

const Menus: MenuItem[] = ConverSitemapListToMenus(SitemapList);

const AdminLayoutSider = () => {
  const location = useLocation();

  const [currentSelectedMenuKeys, setCurrentSelectedMenuKeys] = useState<string[]>([]);
  const [currentOpenSubmenuKeys, setCurrentOpenSubmenuKeys] = useState<string[]>([]);
  const lastOpenKeys = useRef<string[]>([]);

  // Url 變更時，選取正確的選單項目
  useEffect(() => {
    const mathedSitemapAndParents = sitemapUtil.getMatchSitemapAndParents(location.pathname);

    if (mathedSitemapAndParents) {
      // 自身節點與父節點中，有對應 Route 資訊的都要選取
      const currentSitemapPathKeys = [...mathedSitemapAndParents.parents, mathedSitemapAndParents.sitemap]
        .filter((sitemapPathNode) => sitemapPathNode.route)
        .map((routeSitemapParent) => routeSitemapParent.key);

      // 父節點中，有出現在 Menu 的都要展開
      const currentOpenSubmenuKeys = mathedSitemapAndParents.parents
        .filter((parent) => parent.showInMenu)
        .map((routeSitemapParent) => routeSitemapParent.key);

      setCurrentSelectedMenuKeys(currentSitemapPathKeys);
      setCurrentOpenSubmenuKeys(currentOpenSubmenuKeys);
      lastOpenKeys.current = currentOpenSubmenuKeys;
    } else {
      setCurrentOpenSubmenuKeys([]);
      setCurrentSelectedMenuKeys([]);
      lastOpenKeys.current = [];
    }
  }, [location.pathname]);

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onCollapse={(collapsed) => {
        // 避免開關時應該被開啟的 Menu 被關閉
        if (collapsed) {
          lastOpenKeys.current = currentOpenSubmenuKeys;
        } else {
          // 避免寬度展開的動畫和 Menu 展開的動畫同時，造成畫面閃爍
          setTimeout(() => {
            setCurrentOpenSubmenuKeys(lastOpenKeys.current);
          }, 300);
        }
      }}
    >
      <div style={{ margin: "12px" }}>
        <Link to="/users/create">
          <img src="https://via.placeholder.com/150x30" alt="logo" />
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        items={Menus}
        selectedKeys={currentSelectedMenuKeys}
        openKeys={currentOpenSubmenuKeys}
        onSelect={(e) => setCurrentSelectedMenuKeys(e.selectedKeys)}
        onOpenChange={(openKeys) => setCurrentOpenSubmenuKeys(openKeys)}
      />
    </Sider>
  );
};

export default AdminLayoutSider;
