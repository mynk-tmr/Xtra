import { useForm } from "react-hook-form";
import { Link, useOutletContext } from "react-router-dom";
import { loginFields } from "@/config/formFields";
import Fieldset from "@/components/Fieldset";
import usePageTitle from "@/libs/hooks/usePageTitle";
import LabeledInput from "@/components/LabeledInput";
import LoadingDots from "@/components/LoadingDots";

const LoginForm = () => {
  usePageTitle("Xtra | Login");
  const { register, handleSubmit } = useForm();
  const { submitUserInfo, onError, isLoading } = useOutletContext();
  if (isLoading) {
    return (
      <LoadingDots>
        <h4>Logging in please wait ....</h4>
      </LoadingDots>
    );
  }
  return (
    <form
      onSubmit={handleSubmit(
        (data) => submitUserInfo({ data, endpoint: "authorize/login" }),
        onError
      )}
      noValidate>
      <Fieldset legend="Login">
        {loginFields.map((field) => (
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
            })}
          />
        ))}
        <button className="!btn-md btn-primary">Sign In</button>
      </Fieldset>
      <section className="flex justify-around mt-4 *:border-2 ">
        <Link to="register" className="btn btn-sm text-info">
          New Account? Register
        </Link>
        <Link to="recovery" className="btn btn-sm text-error">
          Forgot Password? Seek Help
        </Link>
      </section>
    </form>
  );
};

export default LoginForm;
