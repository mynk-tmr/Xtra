import { FormProvider, useForm } from "react-hook-form";
import DescriptionSection from "./DescriptionSection";

const FormContainer = () => {
  const formMethods = useForm();
  return (
    <FormProvider {...formMethods}>
      <form noValidate>
        <DescriptionSection />
      </form>
    </FormProvider>
  );
};

export default FormContainer;
