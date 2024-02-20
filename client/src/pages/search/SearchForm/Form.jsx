import { useForm } from "react-hook-form";
import createLisitingFields, {
  facilitiesArray,
} from "@/config/createLisitingFields";
import LabeledInput from "@/components/LabeledInput";
import LocationSet from "./LocationSet";
import { notifyError } from "@/libs/utils/toast";

let fields = createLisitingFields;

const Form = ({ onValid, init }) => {
  const { register, getValues, handleSubmit } = useForm({
    values: init,
  });
  return (
    <form
      onSubmit={handleSubmit(onValid, notifyError)}
      className={`
      flex flex-wrap *:grow p-2 *:m-4
      [&_legend]:bg-blue-100 [&_legend]:w-full [&_legend]:p-1 [&_legend]:mb-1
      `}>
      <LocationSet {...{ register, getValues, fields }} />

      <fieldset>
        <legend className="text-xs font-medium">Price Range (per day)</legend>
        <LabeledInput
          type="number"
          label="Lowest price (min. 1)"
          {...register(fields.pricePerDay + "Min", {
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Price range is invalid",
            },
          })}
          className="w-[18ch] block mt-1"
        />
        <LabeledInput
          type="number"
          label="Highest price"
          {...register(fields.pricePerDay + "Max", {
            valueAsNumber: true,
            validate: (val) => {
              if (val && val < getValues(fields.pricePerDay + "Min"))
                return "Price Range is invalid";
            },
          })}
          className="w-[18ch] block mt-1"
        />
      </fieldset>

      <fieldset>
        <legend className="text-xs font-medium">Entrance Dimensions</legend>
        <LabeledInput
          type="number"
          label="Minimium height"
          className="w-[18ch] block mt-1"
          {...register(fields.entranceHeight, {
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Height must be more than 1",
            },
          })}
        />
        <LabeledInput
          type="number"
          label="Minimium width"
          className="w-[18ch] block mt-1"
          {...register(fields.entranceWidth, {
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Width must be more than 1",
            },
          })}
        />
      </fieldset>

      <fieldset>
        <legend className="text-xs font-medium">
          Storage Space (minimum 10 sq. feet)
        </legend>
        <LabeledInput
          type="number"
          className="w-[18ch] block mt-1"
          {...register(fields.storageSpace, {
            valueAsNumber: true,
            min: {
              value: 10,
              message: "",
            },
          })}
        />
      </fieldset>

      <fieldset>
        <legend className="text-xs font-medium">Star Rating</legend>
        <input
          type="range"
          className="range range-sm range-primary"
          min={1}
          max={5}
          step={1}
          {...register(fields.starRating, {
            value: 3,
          })}
        />
        <span className="flex justify-between mx-1 *:text-sm">
          <b>1</b>
          <b>2</b>
          <b>3</b>
          <b>4</b>
          <b>5</b>
        </span>
      </fieldset>

      <fieldset className="w-full columns-2 xs:columns-3">
        <legend className="text-xs font-medium">Facilities</legend>
        {facilitiesArray.map((facility) => (
          <LabeledInput
            label={facility}
            key={facility}
            id={facility}
            value={facility}
            {...register(fields.facilities)}
            type="checkbox"
            className="cursor-pointer scale-75"
          />
        ))}
      </fieldset>

      <fieldset className="flex basis-full justify-between border-t border-gray-200 px-5 py-3 mt-6">
        <button type="reset" className="btn btn-xs btn-link text-info">
          Reset All
        </button>
        <button className="btn btn-outline btn-sm text-black">
          Apply Filters
        </button>
      </fieldset>
    </form>
  );
};

export default Form;
