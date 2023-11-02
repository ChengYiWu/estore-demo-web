import type { LazyExoticComponent } from "react";
import { lazy } from "react";

const AllUsers = lazy(() => import("@/pages/User/AllUsers"));

interface Route {
  path: string;
  component: LazyExoticComponent<() => JSX.Element>;
}

interface Routes {
  [key: string]: {
    [key: string]: Route;
  };
}

const RoutesToArray = (routes: Routes) => {
  return Object.values(routes).flatMap((value) => {
    return Object.entries(value).map(([, route]) => route);
  });
};

const routes: Routes = {
  User: {
    AllUsers: {
      path: "/users",
      component: AllUsers,
    },
  },
};

const flattenRoutes = RoutesToArray(routes);

export { routes, flattenRoutes };
