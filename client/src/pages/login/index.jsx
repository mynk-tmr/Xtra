import Xtralogo from "@/components/Xtralogo";
import { useAppContext } from "@/contexts/AppContext";
import { Navigate, Outlet } from "react-router-dom";

const LoginPage = () => {
  const { isLoggedIn } = useAppContext();
  if (isLoggedIn) return <Navigate to="/profile" replace={true} />;
  return (
    <section className="p-8 prose mx-auto pb-40">
      <h1>
        Step into the <Xtralogo className="text-5xl" /> Zone
      </h1>
      <Outlet />
    </section>
  );
};

export default LoginPage;
