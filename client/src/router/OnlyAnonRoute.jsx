import { useLocation } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { Navigate, Outlet } from "react-router-dom";

const OnlyAnonRoute = () => {
  const { state } = useLocation(); //the state pushed by AuthRequired
  const { isLoggedIn } = useAppContext();
  if (isLoggedIn) {
    return <Navigate to={state?.to ?? "/"} state={state} replace />;
  }
  return <Outlet />;
};

export default OnlyAnonRoute;
