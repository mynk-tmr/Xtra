import usePageTitle from "@/libs/hooks/usePageTitle";
import { Link } from "react-router-dom";
import NewBooking from "./NewBooking";
import { useMutation } from "react-query";
import * as apiClient from "@/libs/utils/apiClient";
import { notifyError } from "@/libs/utils/toast";
import LoadingDots from "@/components/LoadingDots";
import { HeartIcon } from "@heroicons/react/16/solid";

const AddBookingPage = ({ storageData }) => {
  usePageTitle("Xtra | Add Booking");
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: () => {
      const data = { assetId: storageData._id };
      return apiClient.post({ data, endpoint: "my-bookings/add" });
    },
    onError: notifyError,
  });

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
            to=".."
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
