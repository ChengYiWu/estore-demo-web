import { useMemo } from "react";
import { Navigate } from "react-router-dom";

const LoginLayout = () => {
  const token = useMemo(() => localStorage.getItem("token"), []);

  if(token) {
    return <Navigate to="/" replace />;
  }
  
  return <div>This is Login Layout Page</div>;
};

export default LoginLayout;
