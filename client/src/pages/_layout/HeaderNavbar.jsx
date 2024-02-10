import { Link, useLocation } from "react-router-dom";
import Xtralogo from "@/components/Xtralogo";
import { useAppContext } from "@/contexts/AppContext";
import {
  HeartIcon,
  MapIcon,
  BuildingOfficeIcon,
  UserCircleIcon,
  KeyIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/20/solid";
import useMediaQuery from "@/libs/hooks/useMediaQuery";

const navItems = {
  anon: [
    ["login", "Sign In", KeyIcon],
    ["search", "Search", MapIcon],
  ],
  loggedin: [
    ["search", "Search", MapIcon],
    ["profile", "Profile", UserCircleIcon],
    ["user/listings", "My Listings", BuildingOfficeIcon],
    ["user/bookings", "My Bookings", HeartIcon],
  ],
};

const HeaderNavbar = () => {
  const { isLoggedIn } = useAppContext();
  const isSmallScreen = useMediaQuery("(max-width:620px)");
  const navList = isLoggedIn ? navItems.loggedin : navItems.anon;
  const closeMenu = () => {
    let focused = document.activeElement;
    focused?.blur();
  };
  const location = useLocation();

  return (
    <nav className="navbar px-4 md:px-12 h-fit fixed bottom-0 xs:top-0 xs:sticky z-10 bg-white">
      <div className="flex-1">
        <Link to="/">
          <Xtralogo className="text-3xl" />
        </Link>
      </div>
      {!isSmallScreen || !isLoggedIn ? (
        <menu className="flex-none menu menu-horizontal">
          {navList.map(([href, name, Icon]) => (
            <li
              key={name}
              className={
                location.pathname.includes(href) ? "!bg-success rounded-md" : ""
              }>
              <Link to={href} className="text-secondary-content">
                <Icon className="size-6" /> {name}
              </Link>
            </li>
          ))}
        </menu>
      ) : (
        <div className="dropdown dropdown-top dropdown-left xs:dropdown-bottom">
          <div role="button" tabIndex="0" className="btn btn-ghost btn-circle">
            <Square3Stack3DIcon className="w-6" />
          </div>
          <menu className="bg-white menu menu-compact dropdown-content p-2 shadow-lg rounded-box w-[36ch] text-base">
            {navList.map(([href, name, Icon]) => (
              <li key={name} onClick={closeMenu}>
                <Link to={href} className="text-secondary-content">
                  <Icon className="size-6" /> {name}
                </Link>
              </li>
            ))}
          </menu>
        </div>
      )}
    </nav>
  );
};

export default HeaderNavbar;
