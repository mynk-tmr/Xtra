import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import * as apiClient from "@/libs/utils/apiClient";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import EnhancedCard from "./EnhancedCard";
import { notifyError, notifySuccess } from "@/libs/utils/toast";
import LoadingDots from "@/components/LoadingDots";
import FetchError from "@/components/FetchError";

const DisplayListings = () => {
  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ["mylistings"],
    queryFn: () => apiClient.get("my-listings"),
    onError: notifyError,
  });

  const { mutate: requestDelete } = useMutation({
    mutationFn: (assetId) => apiClient.destroy(`my-listings/${assetId}`),
    onSuccess: () => {
      notifySuccess("Successfully removed listing");
      refetch();
    },
    onError: notifyError,
  });

  if (isLoading)
    return (
      <LoadingDots>
        <h1>Loading your listings ...</h1>
      </LoadingDots>
    );

  if (isError) return <FetchError refetch={refetch} />;

  return (
    <section>
      <Link
        to="create-new"
        className="fixed z-[999] btn btn-info btn-sm bottom-4 right-[4.25rem] xs:right-8 md:btn-md">
        <PlusCircleIcon className="w-6 inline-block" />
        Create New
      </Link>
      <section className="grid justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((storageData, index) => (
          <EnhancedCard
            key={index}
            storageData={storageData}
            requestDelete={requestDelete}
          />
        ))}
      </section>
    </section>
  );
};

export default DisplayListings;
