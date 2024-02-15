import usePageTitle from "@/libs/hooks/usePageTitle";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "@/libs/utils/apiClient";
import LoadingDots from "@/components/LoadingDots";
import FormContainer from "./create-new/Form/FormContainer";
import Xtralogo from "@/components/Xtralogo";

const EditListingPage = () => {
  usePageTitle("Xtra | Edit Listing");
  const { assetId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: `listing_${assetId}`,
    queryFn: () => apiClient.get(`my-listings/${assetId}`),
    enabled: Boolean(assetId),
    refetchOnWindowFocus: false,
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
      <FormContainer withData={data} />
    </section>
  );
};

export default EditListingPage;
