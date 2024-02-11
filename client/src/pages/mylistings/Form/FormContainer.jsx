import { FormProvider, useForm } from "react-hook-form";
import DescriptionSection from "./DescriptionSection";
import FacilitiesSection from "./FacilitiesSection";
import LocationSection from "./LocationSection";
import ImageUploadSection from "./ImageUploadSection";
import { toast } from "react-toastify";

const FormContainer = () => {
  const formMethods = useForm();
  const { handleSubmit } = formMethods;
  function onSuccess(data) {
    console.log(data);
    toast.success("Your listing is added 😍");
  }
  function onError(errors) {
    setTimeout(() => {
      let firstBad = document.activeElement;
      toast.error(errors[firstBad.name].message);
    }, 0);
  }
  return (
    <FormProvider {...formMethods}>
      <form
        noValidate
        className="grid gap-y-8"
        onSubmit={handleSubmit(onSuccess, onError)}>
        <DescriptionSection />
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
