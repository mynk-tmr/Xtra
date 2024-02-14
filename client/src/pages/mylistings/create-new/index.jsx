import Xtralogo from "@/components/Xtralogo";
import FormContainer from "./Form/FormContainer";
import { useBlocker } from "react-router-dom";
import Blocker from "./Blocker";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "@/libs/utils/apiClient";

const CreateListingPage = () => {
  const queryClient = useQueryClient();
  const {
    mutate: submitData,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (data) => apiClient.postForm({ data, endpoint: "my-listings" }),
    onSuccess: () => {
      toast.success("Your listing is added 😍");
      queryClient.removeQueries({ queryKey: "newlistingLocation" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation !== nextLocation && !isSuccess
  );

  function onError(errors) {
    setTimeout(() => {
      let firstBad = document.activeElement;
      toast.error(errors[firstBad.name].message);
    }, 0);
  }
  return (
    <section>
      <h1>
        Add your new <Xtralogo /> space
      </h1>
      <FormContainer
        blocker={blocker}
        onSucces={submitData}
        onError={onError}
      />
      {blocker.state === "blocked" && <Blocker blocker={blocker} />}
    </section>
  );
};

export default CreateListingPage;
