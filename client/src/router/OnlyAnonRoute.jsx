import { useLocation } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { Navigate, Outlet } from "react-router-dom";
import LoadingDots from "@/components/LoadingDots";

const OnlyAnonRoute = () => {
  const { state } = useLocation(); //the state pushed by AuthRequired
  const { isLoggedIn, isVerifying } = useAppContext();
  if (isVerifying)
    return (
      <LoadingDots>
        <h1 className="text-2xl">Verifying please wait ...</h1>
      </LoadingDots>
    );

  if (isLoggedIn) {
    return <Navigate to={state?.to ?? "/"} replace />;
  }
  return <Outlet />;
};

export default OnlyAnonRoute;
