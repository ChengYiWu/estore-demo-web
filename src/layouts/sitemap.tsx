import {
  AccountBookOutlined,
  BarChartOutlined,
  CreditCardOutlined,
  ShopOutlined,
  ShoppingOutlined,
  TeamOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Routes } from "./routes";
import { RouteSitemap, Sitemap } from "./sitemap.types";

const SitemapList: Sitemap[] = [
  {
    key: "Dashboard",
    label: "儀表板",
    icon: <BarChartOutlined />,
    route: Routes.DashboardSummary,
    showInMenu: true,
  },
  {
    key: "UserModule",
    label: "使用者模組",
    icon: <TeamOutlined />,
    showInMenu: true,
    children: [
      {
        key: "AllUsers",
        label: "使用者管理",
        icon: <UserSwitchOutlined />,
        route: Routes.AllUsers,
        showInMenu: true,
        children: [
          {
            key: "CreateUser",
            label: "新增使用者",
            route: Routes.CreateUser,
            showInMenu: false,
          },
          {
            key: "EditUser",
            label: "編輯使用者",
            route: Routes.EditUser,
            showInMenu: false,
          },
        ],
      },
    ],
  },
  {
    key: "ProductModule",
    label: "商品模組",
    icon: <ShopOutlined />,
    showInMenu: true,
    children: [
      {
        key: "AllProducts",
        label: "商品管理",
        icon: <ShoppingOutlined />,
        route: Routes.AllProducts,
        showInMenu: true,
        children: [
          {
            key: "EditProduct",
            label: "編輯商品",
            route: Routes.EditProduct,
            showInMenu: false,
          },
          {
            key: "CreateProduct",
            label: "新增商品",
            route: Routes.CreateProduct,
            showInMenu: false,
          },
        ],
      },
    ],
  },
  {
    key: "CouponModule",
    label: "優惠券模組",
    icon: <AccountBookOutlined />,
    showInMenu: true,
    children: [
      {
        key: "AllCoupons",
        label: "優惠券管理",
        icon: <CreditCardOutlined />,
        route: Routes.AllCoupons,
        showInMenu: true,
        children: [
          {
            key: "EditCoupon",
            label: "編輯優惠券",
            route: Routes.EditCoupon,
            showInMenu: false,
          },
          {
            key: "CreateCoupon",
            label: "新增優惠券",
            route: Routes.CreateCoupon,
            showInMenu: false,
          },
        ],
      },
    ],
  },
];

// 轉換各 SitemapItem 節點的父節點路徑
function ConvertSitemapItemToParentPathMap(sitemapList: Sitemap[]): Map<RouteSitemap, Sitemap[]> {
  const parentPathMap = new Map<Sitemap, Sitemap[]>();

  // 紀錄各節點的父節點路徑
  sitemapList.forEach((sitemap) => FillSitemapItemParentsMap(sitemap, parentPathMap));

  // 過濾掉沒有 route 的節點
  const resultMap = new Map([...parentPathMap].filter(([key]) => key.route)) as Map<RouteSitemap, Sitemap[]>;

  return resultMap;
}

// 採 DFS 紀錄各節點的父節點路徑
function FillSitemapItemParentsMap(currentItem: Sitemap, itemParentsMap: Map<Sitemap, Sitemap[]>) {
  if (!itemParentsMap.has(currentItem)) {
    itemParentsMap.set(currentItem, []);
  }

  const parentNodes = itemParentsMap.get(currentItem) || [];

  if (currentItem.children) {
    for (const childNode of currentItem.children) {
      itemParentsMap.set(childNode, [...parentNodes, currentItem]);
      FillSitemapItemParentsMap(childNode, itemParentsMap);
    }
  }
}

const SitemapParentPathMap = ConvertSitemapItemToParentPathMap(SitemapList);

export { SitemapList, SitemapParentPathMap };
