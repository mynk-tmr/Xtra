import usePageTitle from "@/libs/hooks/usePageTitle";
import LogOutHandler from "./LogOutHandler";
import { useAppContext } from "@/contexts/AppContext";
import { EnvelopeIcon } from "@heroicons/react/16/solid";
import { UserCircleIcon } from "@heroicons/react/20/solid";

const ProfilePage = () => {
  usePageTitle("Xtra | My Profile");
  const { user } = useAppContext();

  return (
    <section className="grid justify-center">
      <article className="text-xl prose py-4 px-16 border bg-white rounded-box grid gap-8 adjusticons">
        <i>
          <UserCircleIcon className="size-7" /> {user.firstName} {user.lastName}
        </i>
        <code>
          <EnvelopeIcon className="size-7" /> {user.email}
        </code>
        <LogOutHandler />
      </article>
    </section>
  );
};

export default ProfilePage;
