type Route = {
  path: string;
  component: React.ComponentType;
};

type RoutesType = Record<string, Route>;

export type { Route, RoutesType };