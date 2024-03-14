import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoutes = ({ children }) => {
  const { auth } = useAuth();
  const localAuth = JSON.parse(localStorage.getItem("authData"));

  return (
    <>
      {auth?.authToken || localAuth?.authToken ? (
        <>
          {children}
          <Outlet />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoutes;
