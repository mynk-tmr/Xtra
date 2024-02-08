import Xtralogo from "@/components/Xtralogo";
import { Outlet } from "react-router-dom";

const LoginPage = () => {
  document.title = "Xtra | Login";
  return (
    <section className="p-8">
      <h1 className="text-4xl mb-8">
        Start your journey in <Xtralogo />{" "}
      </h1>
      <Outlet />
    </section>
  );
};

export default LoginPage;
