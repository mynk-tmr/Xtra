import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import * as apiClient from "@/libs/utils/apiClient";
import useTokenInvalidator from "@/libs/hooks/useTokenInvalidator";
import useNavigateToHome from "@/libs/hooks/useNavigateToHome";
import { Link } from "react-router-dom";

const formFields = [
  {
    name: "email",
    type: "email",
    validations: {
      pattern: {
        //eslint-disable-next-line no-useless-escape
        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        message: "Email format is invalid !",
      },
    },
  },
  {
    name: "password",
    type: "password",
    validations: {
      minLength: {
        value: 6,
        message: "Password must be of atleast 6 characters",
      },
    },
  },
];

const LoginForm = () => {
  document.title = "Xtra | Login";
  const { register, handleSubmit } = useForm();
  const goto = useNavigateToHome();
  const invalidator = useTokenInvalidator();
  const { mutate: submitUserInfo } = useMutation({
    mutationFn: apiClient.post,
    onSuccess: async function () {
      toast.success("You are signed in! 😎");
      await invalidator();
      goto();
    },
    onError: function () {
      toast.error("Sign In Failed. Kindly try again 😥");
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
      <fieldset className="uppercase">
        {formFields.map((field) => (
          <div className="form-control md:flex-row mb-4" key={field.name}>
            <label
              htmlFor={field.name}
              className="label label-text !text-xs font-bold w-[36ch]">
              {field.name.replaceAll("_", " ")}
            </label>
            <input
              type={field.type}
              id={field.name}
              autoComplete="true"
              className="input input-bordered bg-white w-full"
              {...register(field.name, {
                ...field?.validations,
                required: `${field.name} is required field !`,
              })}
            />
          </div>
        ))}
        <button className="btn btn-secondary text-white w-[20ch]">
          Sign In
        </button>
      </fieldset>
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
