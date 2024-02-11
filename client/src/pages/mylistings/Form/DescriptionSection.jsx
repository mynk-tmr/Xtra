import { useFormContext } from "react-hook-form";

const DescriptionSection = () => {
  const { register } = useFormContext();
  return (
    <fieldset className="grid gap-2 p-4 card-bordered rounded-box bg-white">
      <legend className="text-center text-xl font-bold bg-white px-4 rounded-md">
        Add Details
      </legend>
      <label htmlFor="description" className="label-text font-bold">
        Give a description
      </label>
      <input
        id="description"
        className="input bg-warning/30"
        {...register("description", {
          required: "Description is required",
        })}
      />
    </fieldset>
  );
};

export default DescriptionSection;
