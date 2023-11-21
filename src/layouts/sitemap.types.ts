import { Route } from "./routes.types";

type Sitemap = {
  key: string;
  label: string;
  icon?: JSX.Element;
  route?: Route;
  showInMenu: boolean;
  children?: Sitemap[];
  ignoreBreadcrumb?: boolean;
};

type RouteSitemap = Sitemap & {
  route: Route;
};

export type { Sitemap, RouteSitemap };
