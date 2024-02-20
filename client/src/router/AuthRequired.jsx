import LoadingDots from "@/components/LoadingDots";
import { useAppContext } from "@/contexts/AppContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthRequired = () => {
  const { isLoggedIn, isVerifying } = useAppContext();
  const { pathname: to } = useLocation();
  if (isVerifying)
    return (
      <LoadingDots>
        <h2>Verifying your connection ... </h2>
      </LoadingDots>
    );
  if (!isLoggedIn) return <Navigate to="/login" state={{ to }} />;
  return <Outlet />;
};

export default AuthRequired;
