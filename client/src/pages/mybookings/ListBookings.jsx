import usePageTitle from "@/libs/hooks/usePageTitle";
import StorageView from "@/components/StorageView";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { useOutletContext } from "react-router-dom";

const ListBookings = () => {
  usePageTitle("Xtra | My Bookings");
  const { bookings } = useOutletContext();

  if (!bookings || !bookings.length)
    return (
      <section className="grid place-items-center gap-8">
        <h1 className="text-xl">You do not have any Bookings ...</h1>
        <XCircleIcon className="size-16 text-error" />
        <p className="text-info font-semibold animate-pulse">
          Go to Search Page and start booking storages
        </p>
      </section>
    );

  return (
    <section>
      <header>
        <h1 className="text-xl text-center mb-6">
          To cancel booking, you must <b className="text-info">WhatsApp</b> us
        </h1>
      </header>
      <section className="grid justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((storageData, index) => (
          <StorageView key={index} {...storageData} />
        ))}
      </section>
    </section>
  );
};

export default ListBookings;
