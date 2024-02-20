import usePageTitle from "@/libs/hooks/usePageTitle";
import { Outlet } from "react-router-dom";

const MyListingsLayout = () => {
  usePageTitle("Xtra | My Listings");
  return (
    <section className="grid justify-center">
      <Outlet />
    </section>
  );
};

export default MyListingsLayout;
