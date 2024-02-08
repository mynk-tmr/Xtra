import { Link, useLocation } from "react-router-dom";
import NavItems from "./NavItems";

const NavList = ({ className }) => {
  const location = useLocation();
  return (
    <menu className={className}>
      {NavItems.map((item) => (
        <li
          key={item.title}
          className={`p-1 font-semibold hover:text-blue-500 transition-colors
          ${
            location.pathname.includes(item.href) ? "text-grass" : "text-dblue"
          }`}>
          <Link to={item.href} className="flex gap-2">
            {item.icon}
            {item.title}
          </Link>
        </li>
      ))}
    </menu>
  );
};

export default NavList;
