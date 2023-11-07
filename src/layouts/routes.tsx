import { RoutesType } from "./routes.types";
import { Summary, AllUsers, EditUser, AllProducts, EditProduct, AllCoupons, EditCoupon } from "./routes.components";

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
  AllCoupons: {
    path: "/coupons",
    component: AllCoupons,
  },
  CreateCoupon: {
    path: "/coupons/:id",
    component: EditCoupon,
  },
  EditCoupon: {
    path: "/coupons/:id",
    component: EditCoupon,
  },
};

const flattenRoutes = Object.values(Routes);

export { flattenRoutes, Routes };
