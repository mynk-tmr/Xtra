import { Outlet } from "react-router-dom";

const MyListingsLayout = () => {
  return (
    <section className="p-8 grid justify-center">
      <Outlet />
    </section>
  );
};

export default MyListingsLayout;
