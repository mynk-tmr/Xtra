import Xtralogo from "@/components/Xtralogo";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { state } = useLocation(); //the state pushed by AuthRequired
  const goto = useNavigate();
  const redirectOnSuccess = () => goto(state.from, { replace: true });
  return (
    <section className="p-8 prose mx-auto pb-40">
      <h1>
        Step into the <Xtralogo className="text-5xl" /> Zone
      </h1>
      <Outlet context={{ redirectOnSuccess }} />
    </section>
  );
};

export default LoginPage;
