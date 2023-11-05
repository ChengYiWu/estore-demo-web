import { RoutesType } from "./routes.types";
import Components from "./routes.components";

const { Summary, AllUsers, EditUser } = Components;

const Routes: RoutesType = {
  DashboardSummary: {
    path: "/",
    component: Summary,
  },
  AllUsers: {
    path: "/users",
    component: AllUsers,
  },
  CreateUser: {
    path: "/users/create",
    component: EditUser,
  },
  EditUser: {
    path: "/users/:id",
    component: EditUser,
  },
  AllProducts: {
    path: "/products",
    component: AllUsers,
  },
  CreateProduct: {
    path: "/products/create",
    component: EditUser,
  },
  EditProduct: {
    path: "/products/:id",
    component: EditUser,
  },
};

const flattenRoutes = Object.values(Routes);

export { flattenRoutes, Routes };
