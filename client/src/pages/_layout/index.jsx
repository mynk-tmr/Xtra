import { Outlet } from "react-router-dom";
import HeaderNavbar from "./HeaderNavbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <section className="pb-28 xs:pb-0">
      <HeaderNavbar />
      <div className="p-8">
        <Outlet />
      </div>
      <ToastContainer
        position="top-left"
        className="font-bold"
        autoClose={2500}
      />
    </section>
  );
};

export default RootLayout;
