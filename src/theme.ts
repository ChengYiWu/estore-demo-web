import { ThemeConfig } from "antd";

// 自訂 Antd 元件主題
const theme: ThemeConfig = {
  components: {
    Form: {
      itemMarginBottom: 16,
    },
    Menu: {
      darkItemBg: "#0f3a4a",
      darkSubMenuItemBg: "#0e405e",
    },
    Layout: {
      siderBg: "#0f3a4a"
    }
  },
  token: {
    colorPrimary: "#3386bf"
  },
};

export default theme;
