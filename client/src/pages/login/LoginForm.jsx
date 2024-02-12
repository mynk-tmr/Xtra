import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import * as apiClient from "@/libs/utils/apiClient";
import useTokenInvalidator from "@/libs/hooks/useTokenInvalidator";
import useNavigateToHome from "@/libs/hooks/useNavigateToHome";
import { Link } from "react-router-dom";
import { loginFields } from "@/config/formFields";
import Fieldset from "@/components/Fieldset";
import usePageTitle from "@/libs/hooks/usePageTitle";

const LoginForm = () => {
  usePageTitle("Xtra | Login");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const goto = useNavigateToHome();
  const invalidator = useTokenInvalidator();
  const { mutate: submitUserInfo } = useMutation({
    mutationFn: apiClient.post,
    onSuccess: async function () {
      toast.success("You are signed in! 😎");
      await invalidator();
      goto();
    },
    onError: function (error) {
      toast.error(error.message + "  😥");
    },
  });

  function onValid(data) {
    submitUserInfo({ data, endpoint: "authorize/login" });
  }

  function onError(errors) {
    const { message } = Object.values(errors).at(0);
    toast.error(message.toUpperCase());
  }

  return (
    <form onSubmit={handleSubmit(onValid, onError)} noValidate>
      <Fieldset disabled={isSubmitting} legend="Login">
        {loginFields.map((field) => (
          <section key={field.name}>
            <label htmlFor={field.name} className="uppercase">
              {field.name.replaceAll("_", " ")}
            </label>
            <input
              type={field.type}
              id={field.name}
              autoComplete="true"
              className="!input-md"
              {...register(field.name, {
                ...field?.validations,
                required: `${field.name} is required field !`,
              })}
            />
          </section>
        ))}
        <button className="!btn-md btn-primary">
          {isSubmitting && <span className="loading loading-spinner"></span>}
          Sign In
        </button>
      </Fieldset>
      <Link to="register" className="btn btn-link text-info">
        New Account? Register
      </Link>
      <Link to="recovery" className="btn btn-link text-error">
        Forgot Password? Seek Help
      </Link>
    </form>
  );
};

export default LoginForm;
