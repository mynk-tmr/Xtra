import DetailsSection from "./DetailsSection";
import FacilitiesSection from "./FacilitiesSection";
import LocationSection from "./LocationSection";
import ImageUploadSection from "./ImageUploadSection";
import useLocalStorage from "@/libs/hooks/useLocalStorage";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { notifyFormError } from "@/libs/utils/toast";

const FormContainer = ({
  blocker,
  submit,
  isSuccess,
  withData,
  enableLocalStorage = true, //store to it only for create-new page
}) => {
  const [fromLS, storeToLS, removefromLS] = useLocalStorage(
    enableLocalStorage ? "listingDraft" : ""
  );
  const formMethods = useForm({
    defaultValues: withData ?? fromLS,
  });

  const { getValues, handleSubmit, reset } = formMethods;

  //populate form withData (null or server sent values)
  useEffect(() => {
    reset(withData);
  }, [withData, reset]);

  //on server's ok, clear all
  useEffect(() => {
    if (isSuccess) removefromLS();
  }, [isSuccess, removefromLS]);

  //save to local storage before unmount
  useEffect(() => {
    if (blocker?.state !== "blocked") return;
    else storeToLS(getValues());
  }, [blocker?.state, storeToLS, getValues]);

  const formRef = useRef(null);

  function onValid() {
    let fd = new FormData(formRef.current);
    submit(fd);
  }

  return (
    <FormProvider {...formMethods}>
      <form
        ref={formRef}
        className="grid gap-y-8"
        onSubmit={handleSubmit(onValid, notifyFormError)}
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
