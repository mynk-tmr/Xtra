import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const fields = [
  ["firstName", "text"],
  ["lastName", "text"],
  ["email", "email"],
  ["password", "password"],
];

const RegistrationForm = () => {
  const { register, handleSubmit } = useForm();
  function onValid(jsonFormdata) {
    console.log(jsonFormdata);
  }
  function onError(errors) {
    const { message } = Object.values(errors).at(0);
    toast.error(message.toUpperCase());
  }

  return (
    <form onSubmit={handleSubmit(onValid, onError)} className="w-fit">
      <fieldset className="uppercase text-sm grid gap-4 lg:grid-cols-2">
        {fields.map(([name, type]) => (
          <div key={name} className="form-control md:flex-row">
            <label className="label w-[15ch] font-bold" htmlFor={name}>
              {name}
            </label>
            <input
              className="input min-w-[36ch] input-bordered bg-white text-info"
              id={name}
              type={type}
              {...register(name, {
                required: `${name} is required !`,
              })}
            />
          </div>
        ))}
        <div className="flex mt-4 justify-between">
          <button type="submit" className="btn btn-info btm-nav-sm">
            Create Account
          </button>
          <Link to="reset">
            <button className="ml-auto btn btn-ghost btn-info text-error">
              Forgot Password ?
            </button>
          </Link>
        </div>
      </fieldset>
    </form>
  );
};

export default RegistrationForm;
