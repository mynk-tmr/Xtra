import DetailsSection from "./DetailsSection";
import FacilitiesSection from "./FacilitiesSection";
import LocationSection from "./LocationSection";
import ImageUploadSection from "./ImageUploadSection";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { notifyFormError } from "@/libs/utils/toast";

const FormContainer = ({
  blocker,
  submit,
  withData,
  submitBtnText = "Create New Listing",
}) => {
  const formMethods = useForm({
    values: withData ?? JSON.parse(localStorage.getItem("draft") ?? null),
  });

  const { getValues, handleSubmit } = formMethods;

  //save to local storage before unmount
  useEffect(() => {
    if (blocker?.state == "blocked")
      localStorage.setItem("draft", JSON.stringify(getValues()));
  }, [blocker?.state, getValues]);

  const formRef = useRef(null);

  function onValid() {
    let fd = new FormData(formRef.current);
    let imageUrls = getValues("imageUrls"); //only for editPage
    imageUrls?.forEach((url, i) => fd.append(`imageUrls[${i}]`, url));
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
          {submitBtnText}
        </button>
      </form>
    </FormProvider>
  );
};

export default FormContainer;
