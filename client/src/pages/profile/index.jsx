import LogOutHandler from "./LogOutHandler";
import { useAppContext } from "@/contexts/AppContext";
import { Navigate } from "react-router-dom";

const ProfilePage = () => {
  const { isLoggedIn } = useAppContext();
  if (!isLoggedIn) return <Navigate to="/login" replace={true} />;
  return (
    <section className="p-8">
      <LogOutHandler />
    </section>
  );
};

export default ProfilePage;
