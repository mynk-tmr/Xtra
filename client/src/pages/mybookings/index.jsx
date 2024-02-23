import { Outlet, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "@/libs/utils/apiClient";
import { notifyError } from "@/libs/utils/toast";
import LoadingDots from "@/components/LoadingDots";
import FetchError from "@/components/FetchError";

const BookingsPage = () => {
  const { state } = useLocation();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["mybookings"],
    queryFn: () => apiClient.get("my-bookings"),
    onError: notifyError,
  });

  if (isLoading) {
    return (
      <LoadingDots>
        <h1>Getting Bookings ...</h1>
      </LoadingDots>
    );
  }

  if (isError) {
    return <FetchError refetch={refetch} />;
  }

  return (
    <Outlet
      context={{
        bookings: data,
        storageData: state?.storageData,
      }}
    />
  );
};

export default BookingsPage;
