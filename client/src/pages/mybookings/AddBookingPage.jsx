import usePageTitle from "@/libs/hooks/usePageTitle";
import { Link, Navigate, useOutletContext } from "react-router-dom";
import NewBooking from "./NewBooking";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "@/libs/utils/apiClient";
import { notifyError } from "@/libs/utils/toast";
import LoadingDots from "@/components/LoadingDots";
import { HeartIcon } from "@heroicons/react/16/solid";
import { useAppContext } from "@/contexts/AppContext";

const AddBookingPage = () => {
  usePageTitle("Xtra | Add Booking");
  const { storageData, bookings } = useOutletContext();
  const { user } = useAppContext();

  const qclient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: () => {
      const data = { assetId: storageData._id };
      return apiClient.post({ data, endpoint: "my-bookings/add" });
    },
    onError: notifyError,
    onSuccess: async (newbooking) => {
      qclient.removeQueries({ queryKey: ["mybookings"] });
      window.history.replaceState({}, "");
      qclient.setQueryData(["user"], (user) => {
        return { ...user, bookings: [...user.bookings, newbooking] };
      });
    },
  });

  if (
    !storageData ||
    //already booked
    bookings.some((booking) => booking._id === storageData._id) ||
    //user is himself owner
    user._id === storageData.userId
  ) {
    return <Navigate to="/mybookings" replace />;
  }

  if (isLoading) {
    return (
      <LoadingDots>
        <h1>Requesting Booking ....</h1>
      </LoadingDots>
    );
  }

  return (
    <section>
      {isSuccess && (
        <section className="text-xl grid place-items-center gap-4">
          <b>Booking Confimed</b>
          <HeartIcon className="text-error size-16" />
          <p className="badge badge-lg p-4 bg-success">
            Our Team will Contact you shortly.
          </p>
          <Link
            to="/mybookings"
            className="btn btn-link text-info animate-pulse text-xl">
            See your bookings
          </Link>
        </section>
      )}
      {!isSuccess && storageData && (
        <NewBooking confirm={mutate} storageData={storageData} />
      )}
    </section>
  );
};

export default AddBookingPage;
