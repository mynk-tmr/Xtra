import Xtralogo from "@/components/Xtralogo";
import { Outlet } from "react-router-dom";

const LoginPage = () => {
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
