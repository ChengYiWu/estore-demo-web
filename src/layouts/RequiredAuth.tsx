import useStore from "@/store/index";
import { Navigate, useLocation } from "react-router-dom";

const RequiredAuth = ({ children }: { children: JSX.Element }) => {
  const isAuth = useStore((state) => state.isAuth);
  const location = useLocation();
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequiredAuth;
