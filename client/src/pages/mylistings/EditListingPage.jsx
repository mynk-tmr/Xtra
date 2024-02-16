import usePageTitle from "@/libs/hooks/usePageTitle";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "@/libs/utils/apiClient";
import LoadingDots from "@/components/LoadingDots";
import FormContainer from "./create-new/Form/FormContainer";
import Xtralogo from "@/components/Xtralogo";
import { notifyError, notifySuccess } from "@/libs/utils/toast";

const EditListingPage = () => {
  usePageTitle("Xtra | Edit Listing");
  const { assetId } = useParams();
  const {
    data,
    refetch,
    isLoading: isGettingInfo,
  } = useQuery({
    queryKey: `listing_${assetId}`,
    queryFn: () => apiClient.get(`my-listings/${assetId}`),
    enabled: Boolean(assetId),
    refetchOnWindowFocus: false,
  });

  const {
    mutate,
    isSuccess,
    isLoading: isPuttingInfo,
  } = useMutation({
    mutationFn: (formData) => apiClient.putListing(formData, assetId),
    onSuccess: () => {
      notifySuccess("Your listing was updated 😁");
      refetch();
    },
    onError: notifyError,
  });

  if (isGettingInfo || isPuttingInfo) {
    return (
      <LoadingDots>
        <h1>Processing Request ...</h1>
      </LoadingDots>
    );
  }

  return (
    <section className="prose">
      <h1 className="text-center">
        Edit your <Xtralogo /> Storage{" "}
      </h1>
      <FormContainer
        withData={data}
        submit={mutate}
        isSuccess={isSuccess}
        enableLocalStorage={false}
        submitBtnText="Update This Listing"
      />
    </section>
  );
};

export default EditListingPage;
