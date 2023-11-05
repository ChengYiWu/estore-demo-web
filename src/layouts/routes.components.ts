import { lazy } from "react";

// 各個需要 Code Splite 動態載入的頁面
const Summary = lazy(() => import("@pages/Dashboard/Summary"));
const AllUsers = lazy(() => import("@pages/User/AllUsers"));
const EditUser = lazy(() => import("@pages/User/EditUser"));

export default {
  Summary,
  AllUsers,
  EditUser,
};
