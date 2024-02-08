import { Link, useLocation } from "react-router-dom";

const createLink = (text, href) => ({ text, href });

const NavList = ({ className }) => {
  const location = useLocation();
  const list = [
    createLink("Home", "/home"),
    createLink("Offers", "/offers"),
    createLink("Profile", "/profile"),
  ];
  return (
    <menu className={className}>
      {list.map((item) => (
        <li
          key={item.text}
          className={`p-1 font-semibold hover:text-blue-500 transition-colors
          ${
            location.pathname.includes(item.href) ? "text-sky" : "text-dblue"
          }`}>
          <Link to={item.href} className="block">
            {item.text}
          </Link>
        </li>
      ))}
    </menu>
  );
};

export default NavList;
