// import type { LazyExoticComponent } from "react";

// // 側攔選單資訊
// type Menu = {
//   name: string;
//   icon: React.ReactElement;
// };

// type Route = {
//   path: string;
//   component: LazyExoticComponent<() => JSX.Element>;
//   menu?: Menu;
// };

// type Module = {
//   menu: Menu;
//   routes: Modules;
// };

// type Modules = Record<string, Module | Route>;

// export type { Menu, Route, Module, Modules };


type Route = {
  path: string;
  component: React.ComponentType;
};

type RoutesType = Record<string, Route>;

export type { Route, RoutesType };