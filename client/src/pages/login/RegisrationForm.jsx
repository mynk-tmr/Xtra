import { useForm } from "react-hook-form";
import { registrationFields } from "@/config/formFields";
import Fieldset from "@/components/Fieldset";
import usePageTitle from "@/libs/hooks/usePageTitle";
import LabeledInput from "@/components/LabeledInput";
import { useOutletContext } from "react-router-dom";

const RegistrationForm = () => {
  usePageTitle("Xtra | Create Account");
  const { register, handleSubmit, watch } = useForm();
  const { submitUserInfo, onError } = useOutletContext();

  return (
    <form
      onSubmit={handleSubmit(
        (data) => submitUserInfo({ data, endpoint: "users/register" }),
        onError
      )}
      noValidate>
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
