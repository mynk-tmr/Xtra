import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import * as apiClient from "@/libs/utils/apiClient";
import useTokenInvalidator from "@/libs/hooks/useTokenInvalidator";
import useNavigateToHome from "@/libs/hooks/useNavigateToHome";
import { registrationFields } from "@/config/formFields";
import Fieldset from "@/components/Fieldset";

const RegistrationForm = () => {
  document.title = "Xtra | Create Account";
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm();
  const goto = useNavigateToHome();
  const invalidator = useTokenInvalidator();
  const { mutate: submitUserInfo } = useMutation({
    mutationFn: apiClient.post,
    onSuccess: async function () {
      toast.success("Registration successful 😎");
      await invalidator();
      goto();
    },
    onError: function (error) {
      //.message is what we sent from server or apiClient
      toast.error(error.message + "  😥");
    },
  });

  function onValid(data) {
    //calls apiClient.post
    submitUserInfo({ data, endpoint: "users/register" });
  }

  function onError(errors) {
    const { message } = Object.values(errors).at(0);
    toast.error(message.toUpperCase());
  }

  return (
    <form onSubmit={handleSubmit(onValid, onError)} noValidate>
      <Fieldset legend="Add Account" disabled={isSubmitting}>
        {registrationFields.map((field) => (
          <section key={field.name}>
            <label
              htmlFor={field.name}
              className="uppercase !text-xs font-bold">
              {field.name.replaceAll("_", " ")}
            </label>
            <input
              type={field.type}
              id={field.name}
              className="mx-4 !input-md"
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
          </section>
        ))}
        <button className="!btn-md !btn-secondary">
          {isSubmitting && <span className="loading loading-spinner"></span>}
          Create Account
        </button>
      </Fieldset>
    </form>
  );
};

export default RegistrationForm;
