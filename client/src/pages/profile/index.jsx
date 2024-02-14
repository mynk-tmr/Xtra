import usePageTitle from "@/libs/hooks/usePageTitle";
import LogOutHandler from "./LogOutHandler";

const ProfilePage = () => {
  usePageTitle("Xtra | My Profile");
  return (
    <section className="p-8">
      <LogOutHandler />
    </section>
  );
};

export default ProfilePage;
