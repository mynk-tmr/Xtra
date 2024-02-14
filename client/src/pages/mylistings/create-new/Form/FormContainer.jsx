import DetailsSection from "./DetailsSection";
import FacilitiesSection from "./FacilitiesSection";
import LocationSection from "./LocationSection";
import ImageUploadSection from "./ImageUploadSection";
import useLocalStorage from "@/libs/hooks/useLocalStorage";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";

const FormContainer = ({ blocker, onSucces, onError }) => {
  const [formValues, storeFormValues, removeFormValues] =
    useLocalStorage("listingDraft");
  const formMethods = useForm({
    defaultValues: formValues,
  });

  const { getValues, handleSubmit } = formMethods;

  //save to local storage before unmount
  useEffect(() => {
    if (blocker.state !== "blocked") return;
    else storeFormValues(getValues());
  }, [blocker.state, storeFormValues, getValues]);

  function handleSuccess() {
    removeFormValues();
    let fd = new FormData(formRef.current);
    onSucces(fd);
  }

  const formRef = useRef(null);

  return (
    <FormProvider {...formMethods}>
      <form
        ref={formRef}
        className="grid gap-y-8"
        onSubmit={handleSubmit(handleSuccess, onError)}
        encType="multipart/form-data">
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
