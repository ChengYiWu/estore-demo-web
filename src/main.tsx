import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StyleProvider, px2remTransformer } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import { router } from "@utils/index";
import theme from "./theme";

const queryClient = new QueryClient();

const px2rem = px2remTransformer({
  rootValue: 16, // 16px = 1rem; @default 16,
  mediaQuery: true,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StyleProvider transformers={[px2rem]}>
        <ConfigProvider theme={theme}>
          <RouterProvider router={router} />
        </ConfigProvider>
      </StyleProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
