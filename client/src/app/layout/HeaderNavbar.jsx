import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import NavList from "./NavList";
import useToggle from "@/libs/hooks/useToggle";
import useMediaQuery from "@/libs/hooks/useMediaQuery";
import Xtralogo from "@/components/Xtralogo";

const HeaderNavbar = () => {
  const [open, toggle] = useToggle(false);
  const isSmallScreen = useMediaQuery("(max-width: 576px)");
  return (
    <nav
      className={`h-fit w-full px-6 py-3 z-50 fixed bottom-0 shadow-stripe ${
        !isSmallScreen && "top-0 sticky border-none"
      }`}>
      <div className="flex items-center">
        <Link to="/" className="py-1.5 mr-auto">
          <Xtralogo className="text-2xl" />
        </Link>
        {!isSmallScreen ? (
          <NavList className="mx-0 flex flex-row items-center gap-6" />
        ) : (
          <button className="size-6 [&_svg]:size-6" onClick={toggle}>
            {open ? (
              <XMarkIcon strokeWidth={2} />
            ) : (
              <Bars3Icon strokeWidth={2} />
            )}
          </button>
        )}
      </div>
      {isSmallScreen && open && (
        <div onClick={toggle}>
          <NavList className="my-2 flex flex-col gap-2" />
        </div>
      )}
    </nav>
  );
};

export default HeaderNavbar;
