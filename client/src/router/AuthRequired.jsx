import { useAppContext } from "@/contexts/AppContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthRequired = () => {
  const { isLoggedIn } = useAppContext();
  const { pathname: to, state } = useLocation();
  if (!isLoggedIn) return <Navigate to="/login" state={{ ...state, to }} />;
  return <Outlet />;
};

export default AuthRequired;
