import { Navigate, useLocation } from "react-router-dom";

const RequiredAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequiredAuth;
