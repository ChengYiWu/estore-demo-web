import { Routes, Route, Outlet, useLocation, Navigate } from "react-router-dom";
import Unauthorize from "@components/Unauthorize";
import NotFound from "@components/NotFound";

const LoginLayout = () => {
  return <div>This is Login Layout Page</div>;
};

const AdminLayout = () => {
  return (
    <div>
      This is Admin Layout Page <Outlet />
    </div>
  );
};

const RequiredAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const Layout = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginLayout />} />
        <Route path="/unauthorized" element={<Unauthorize />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/"
          element={
            <RequiredAuth>
              <AdminLayout />
            </RequiredAuth>
          }
        >
          {/* <Route
            path="/"
            element={
              <RequiredAuth>
                <div>Home</div>
              </RequiredAuth>
            }
          /> */}
          <Route
            path="/users"
            element={
              <RequiredAuth>
                <div>User List</div>
              </RequiredAuth>
            }
          />
          <Route
            path="/products"
            element={
              <RequiredAuth>
                <div>Product List</div>
              </RequiredAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Layout;
