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
  const { data, isLoading } = useQuery({
    queryKey: `listing_${assetId}`,
    queryFn: () => apiClient.get(`my-listings/${assetId}`),
    enabled: Boolean(assetId),
    refetchOnWindowFocus: false,
  });

  const { mutate, isSuccess } = useMutation({
    mutationFn: (formData) => apiClient.putListing(formData, assetId),
    onSuccess: () => {
      notifySuccess("Your listing was updated 😁");
    },
    onError: notifyError,
  });

  if (isLoading) {
    return (
      <LoadingDots>
        <h1>Loading info ..</h1>
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
      />
    </section>
  );
};

export default EditListingPage;
