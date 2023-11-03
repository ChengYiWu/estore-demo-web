import type { LazyExoticComponent } from "react";
import { lazy } from "react";

interface Route {
  path: string;
  component: LazyExoticComponent<() => JSX.Element>;
}

const EditUser = lazy(() => import("@pages/User/EditUser"));

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
      component: lazy(() => import("@pages/User/AllUsers")),
    },
    EditUser: {
      path: "/users/:id",
      component: EditUser,
    },
    CreateUser: {
      path: "/users/create",
      component: EditUser,
    }
  },
};

const flattenRoutes = RoutesToArray(routes);

export { routes, flattenRoutes };
