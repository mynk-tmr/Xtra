import { ArrowLeftCircleIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";

const CustomLink = ({ to, children }) =>
  to ? <Link to={to}>{children}</Link> : null;

const Pagination = ({ links }) => {
  return (
    <section className="flex justify-center adjust-icons">
      <nav className="join *:join-item *:btn *:btn-sm gap-1 *:btn-info mt-8">
        <CustomLink to={links.first}>1</CustomLink>
        <CustomLink to={links.prev}>
          <ArrowLeftCircleIcon className="size-5" />
        </CustomLink>
        <CustomLink className="btn-disabled">...</CustomLink>
        <CustomLink to={links.next}>
          <ArrowLeftCircleIcon className="size-5 rotate-180" />
        </CustomLink>
        <CustomLink to={links.last}>last</CustomLink>
      </nav>
    </section>
  );
};

export default Pagination;
