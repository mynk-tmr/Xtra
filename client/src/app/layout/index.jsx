import { Outlet } from "react-router-dom";
import HeaderNavbar from "./HeaderNavbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import useMediaQuery from "@/libs/hooks/useMediaQuery";

const RootLayout = () => {
  const isSmallScreen = useMediaQuery("(max-width:576px)");
  return (
    <section>
      <HeaderNavbar />
      <Outlet />
      <ToastContainer
        position={isSmallScreen ? "top-left" : "bottom-left"}
        className="font-bold"
        autoClose={2500}
      />
    </section>
  );
};

export default RootLayout;
