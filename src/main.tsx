import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StyleProvider, px2remTransformer } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import theme from "./theme";
import App from "./App";

const queryClient = new QueryClient();

const px2rem = px2remTransformer({
  rootValue: 16, // 16px = 1rem; @default 16,
  mediaQuery: true,
});

// 因為要可以在 component tree 之外使用 navigate function
// Ref: https://github.com/remix-run/react-router/issues/9422
const router = createBrowserRouter([
  // match everything with "*"
  { path: "*", element: <App /> },
]);

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
