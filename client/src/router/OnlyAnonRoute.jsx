import { useLocation } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { Navigate, Outlet } from "react-router-dom";

const OnlyAnonRoute = () => {
  const { state } = useLocation(); //the state pushed by AuthRequired
  const { isLoggedIn, isVerifying } = useAppContext();
  if (isVerifying) return null;
  if (isLoggedIn) {
    return <Navigate to={state?.from ?? "/"} replace />;
  }
  return <Outlet />;
};

export default OnlyAnonRoute;
