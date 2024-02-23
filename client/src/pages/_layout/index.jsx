import { Outlet } from "react-router-dom";
import HeaderNavbar from "./HeaderNavbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useAppContext } from "@/contexts/AppContext";
import Xtralogo from "@/components/Xtralogo";

const RootLayout = () => {
  const { isVerifying } = useAppContext();
  if (isVerifying) {
    return (
      <section className="grid place-items-center text-6xl h-screen bg-white">
        <Xtralogo className="animate-bounce" />
      </section>
    );
  }
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
