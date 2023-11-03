import { Suspense } from "react";
import type { LazyExoticComponent } from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import RequiredAuth from "./RequiredAuth";
import LoginLayout from "./LoginLayout";
import NotFound from "@/components/NotFound";
import { flattenRoutes } from "./routes";

const SuspenseFallback = (Component: LazyExoticComponent<() => JSX.Element>) => {
  return (
    <Suspense fallback={<>Loading ...</>}>
      <Component />
    </Suspense>
  );
};

const Layout = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginLayout />} />
      <Route
        path="/"
        element={
          <RequiredAuth>
            <AdminLayout />
          </RequiredAuth>
        }
      >
        {flattenRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={SuspenseFallback(route.component)} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Layout;
