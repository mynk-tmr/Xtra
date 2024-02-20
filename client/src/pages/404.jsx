import usePageTitle from "@/libs/hooks/usePageTitle";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const goto = useNavigate();
  usePageTitle("Xtra | Not Found");
  return (
    <section className="h-screen grid gap-y-8 place-content-center px-6">
      <h1 className="text-5xl text-balance text-center">Page Not Found !!!</h1>
      <div className="loading loading-infinity w-10 mx-auto"></div>
      <button
        className="btn btn-info"
        onClick={() => goto("/", { replace: true })}>
        Go to Home
      </button>
    </section>
  );
};

export default NotFound;
