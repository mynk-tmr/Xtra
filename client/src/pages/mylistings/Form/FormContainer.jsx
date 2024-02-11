import { FormProvider, useForm } from "react-hook-form";
import DescriptionSection from "./DescriptionSection";
import FacilitiesSection from "./FacilitiesSection";
import LocationSection from "./LocationSection";

const FormContainer = () => {
  const formMethods = useForm();
  return (
    <FormProvider {...formMethods}>
      <form noValidate className="grid gap-y-8">
        <DescriptionSection />
        <FacilitiesSection />
        <LocationSection />
      </form>
    </FormProvider>
  );
};

export default FormContainer;
