import { lazy } from "react";

// 各個需要 Code Splite 動態載入的頁面
const Summary = lazy(() => import("@pages/Dashboard/Summary"));
const AllUsers = lazy(() => import("@pages/User/AllUsers"));
const EditUser = lazy(() => import("@pages/User/EditUser"));
const AllProducts = lazy(() => import("@pages/Product/AllProducts"));
const EditProduct = lazy(() => import("@pages/Product/EditProduct"));
const AllCoupons = lazy(() => import("@pages/Coupon/AllCoupons"));
const EditCoupon = lazy(() => import("@pages/Coupon/EditCoupon"));

export { Summary, AllUsers, EditUser, AllProducts, EditProduct, AllCoupons, EditCoupon };
