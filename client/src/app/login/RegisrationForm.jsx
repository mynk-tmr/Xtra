import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const formFields = [
  {
    name: "firstName",
    type: "text",
  },
  {
    name: "lastName",
    type: "text",
  },
  {
    name: "email",
    type: "email",
    validations: {
      pattern: {
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
  {
    name: "confirm_password",
    type: "password",
  },
];

const RegistrationForm = () => {
  const { register, handleSubmit, watch } = useForm();
  function onValid(jsonFormdata) {
    console.log(jsonFormdata);
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
                validate:
                  field.name === "confirm_password" &&
                  function (val) {
                    if (watch("password") !== val)
                      return "your passwords don't match !";
                  },
              })}
            />
          </div>
        ))}
        <button className="btn btn-info btn-outline">Create Account</button>
      </fieldset>
    </form>
  );
};

export default RegistrationForm;
