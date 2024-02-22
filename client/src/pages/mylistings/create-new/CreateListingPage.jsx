import Xtralogo from "@/components/Xtralogo";
import FormContainer from "./Form/FormContainer";
import { Navigate, useBlocker } from "react-router-dom";
import Blocker from "./Blocker";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "@/libs/utils/apiClient";
import LoadingDots from "@/components/LoadingDots";
import { notifyError, notifySuccess } from "@/libs/utils/toast";

const CreateListingPage = () => {
  const queryClient = useQueryClient();
  const {
    mutate: submitData,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: apiClient.postListing,
    onSuccess: () => {
      notifySuccess("Your listing is added 😍");
      queryClient.removeQueries({ queryKey: "newlistingLocation" });
    },
    onError: notifyError,
  });

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation !== nextLocation && !isSuccess
  );

  if (isSuccess) return <Navigate to=".." />;

  return (
    <section className="prose">
      <h1>
        Add your new <Xtralogo /> space
      </h1>
      <FormContainer
        blocker={blocker}
        submit={submitData}
        isSuccess={isSuccess}
      />
      {blocker.state === "blocked" && <Blocker blocker={blocker} />}
      {isLoading && (
        <LoadingDots>
          <h4>Creating your Listing ....</h4>{" "}
        </LoadingDots>
      )}
    </section>
  );
};

export default CreateListingPage;
