import { RoutesType } from "./routes.types";
import Components from "./routes.components";

const { Summary, AllUsers, EditUser, AllProducts, EditProduct } = Components;

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
    component: AllProducts,
  },
  CreateProduct: {
    path: "/products/create",
    component: EditProduct,
  },
  EditProduct: {
    path: "/products/:id",
    component: EditProduct,
  },
};

const flattenRoutes = Object.values(Routes);

export { flattenRoutes, Routes };
