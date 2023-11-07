import { Route } from "@/layouts/routes.types";
import { generatePath } from "react-router-dom";

const routeUtil = {
  getRoutePath: (route: Route, params?: Record<string, any>) => {
    return generatePath(route.path, params);
  },
};

export default routeUtil;
