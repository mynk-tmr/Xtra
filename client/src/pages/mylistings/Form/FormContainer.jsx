import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import FacilitiesSection from "./FacilitiesSection";
import LocationSection from "./LocationSection";
import ImageUploadSection from "./ImageUploadSection";
import { toast } from "react-toastify";
import useLocalStorage from "@/libs/hooks/useLocalStorage";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

const FormContainer = () => {
  const [formValues, storeFormValues, removeFormValues] =
    useLocalStorage("listingDraft");
  const formMethods = useForm({ defaultValues: formValues });
  const { handleSubmit, getValues } = formMethods;
  const queryClient = useQueryClient();
  const goto = useNavigate();

  function onSuccess(data) {
    console.log(data);
    toast.success("Your listing is added 😍");
    setTimeout(removeFormValues, 0); //to run this after React cleanups
    queryClient.removeQueries({ queryKey: "newlistingLocation" });
    goto("/profile");
  }
  function onError(errors) {
    setTimeout(() => {
      let firstBad = document.activeElement;
      toast.error(errors[firstBad.name].message);
    }, 0);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => storeFormValues(getValues()), []);

  return (
    <FormProvider {...formMethods}>
      <form
        noValidate
        className="grid gap-y-8"
        onSubmit={handleSubmit(onSuccess, onError)}>
        <DetailsSection />
        <FacilitiesSection />
        <LocationSection />
        <ImageUploadSection />
        <button type="submit" className="btn btn-secondary">
          Create New Listing
        </button>
      </form>
    </FormProvider>
  );
};

export default FormContainer;
