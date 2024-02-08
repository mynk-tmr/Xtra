import { NavLink } from "react-router-dom";

export const NavButton = ({ children, className, ...props }) => {
  return (
    <NavLink
      className={`px-3 py-1 focus:outline-dashed outline-1 font-semibold border-2 border-transparent rounded-md transition-all ${className}`}
      {...props}>
      {children}
    </NavLink>
  );
};
