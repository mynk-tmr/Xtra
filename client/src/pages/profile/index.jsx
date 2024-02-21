import usePageTitle from "@/libs/hooks/usePageTitle";
import LogOutHandler from "./LogOutHandler";
import { useAppContext } from "@/contexts/AppContext";
import { EnvelopeIcon } from "@heroicons/react/16/solid";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import LoadingDots from "@/components/LoadingDots";

const ProfilePage = () => {
  usePageTitle("Xtra | My Profile");
  const { user } = useAppContext();
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <LoadingDots>
        <h1 className="text-xl">Logging you out please wait ...</h1>
      </LoadingDots>
    );
  }

  return (
    <section className="grid justify-center">
      <article className="text-xl prose py-4 px-16 border bg-white rounded-box grid gap-8 adjusticons">
        <i>
          <UserCircleIcon className="size-7" /> {user.firstName} {user.lastName}
        </i>
        <code>
          <EnvelopeIcon className="size-7" /> {user.email}
        </code>
        <LogOutHandler handleLoading={() => setLoading(true)} />
      </article>
    </section>
  );
};

export default ProfilePage;
