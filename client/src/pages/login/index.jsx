import Xtralogo from "@/components/Xtralogo";
import { Outlet } from "react-router-dom";

const LoginPage = () => {
  document.title = "Xtra | Login";
  return (
    <section className="p-8 prose mx-auto pb-40">
      <h1>
        Start your journey in <Xtralogo />{" "}
      </h1>
      <Outlet />
    </section>
  );
};

export default LoginPage;
