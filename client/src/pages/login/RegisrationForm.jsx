import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import * as apiClient from "@/libs/utils/apiClient";
import useTokenInvalidator from "@/libs/hooks/useTokenInvalidator";
import { registrationFields } from "@/config/formFields";
import Fieldset from "@/components/Fieldset";
import usePageTitle from "@/libs/hooks/usePageTitle";
import LabeledInput from "@/components/LabeledInput";
import LoadingDots from "@/components/LoadingDots";

const RegistrationForm = () => {
  usePageTitle("Xtra | Create Account");
  const { register, handleSubmit, watch } = useForm();
  const invalidator = useTokenInvalidator();
  const { mutate: submitUserInfo, isLoading } = useMutation({
    mutationFn: (data) => apiClient.post({ data, endpoint: "users/register" }),
    onSuccess: async function () {
      toast.success("Registration successful 😎");
      await invalidator();
    },
    onError: function (error) {
      toast.error(error.message + "  😥");
    },
  });

  function onError(errors) {
    const { message } = Object.values(errors).at(0);
    toast.error(message.toUpperCase());
  }

  if (isLoading) {
    return (
      <LoadingDots>
        <h4>Registering your Account. Please wait ....</h4>
      </LoadingDots>
    );
  }

  return (
    <form onSubmit={handleSubmit(submitUserInfo, onError)} noValidate>
      <Fieldset legend="Add Account">
        {registrationFields.map((field) => (
          <LabeledInput
            key={field.name}
            label={
              <b className="capitalize">{field.name.replaceAll("_", " ")}</b>
            }
            type={field.type}
            autoComplete="true"
            {...register(field.name, {
              ...field?.validations,
              required: `${field.name} is required field !`,
              validate:
                field.name === "confirm_password" &&
                function (val) {
                  if (watch("password") !== val)
                    return "your passwords don't match !";
                },
            })}
          />
        ))}
        <button className="btn-secondary !btn-md">Create Account</button>
      </Fieldset>
    </form>
  );
};

export default RegistrationForm;
