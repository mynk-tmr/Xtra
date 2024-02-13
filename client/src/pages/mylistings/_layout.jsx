import { Outlet } from "react-router-dom";

const MyListingsLayout = () => {
  return (
    <section className="p-8 mx-auto prose">
      <Outlet />
    </section>
  );
};

export default MyListingsLayout;
