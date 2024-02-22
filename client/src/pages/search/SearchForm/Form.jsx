import { useForm } from "react-hook-form";
import {
  searchListingFields as fields,
  facilitiesArray,
  typesArray,
} from "@/config/listingFields";
import LabeledInput from "@/components/LabeledInput";
import PincodeFieldset from "./PincodeFieldset";
import { notifyError } from "@/libs/utils/toast";

const Form = ({ onValid, withData }) => {
  const { register, getValues, setValue, handleSubmit } = useForm({
    values: withData,
    defaultValues: {
      [fields.starRating]: 1,
    },
  });

  //reset() doesn't work for 'controlled' values, so manually have to set
  const doReset = () => {
    for (let key in fields) {
      setValue(fields[key], "");
    }
    setValue(fields.starRating, 1);
  };

  return (
    <form
      onSubmit={handleSubmit(onValid, notifyError)}
      className={`
      flex flex-wrap *:grow p-2 *:m-4
      [&_legend]:bg-blue-100 [&_legend]:w-full [&_legend]:p-1 [&_legend]:mb-1
      `}>
      <PincodeFieldset {...{ register, getValues, setValue, fields }} />

      <fieldset>
        <legend className="text-xs font-medium">Price Range (per day)</legend>
        <LabeledInput
          type="number"
          label="Lowest price (min. 1)"
          {...register(fields.pricePerDayMin)}
          className="w-[18ch] block mt-1"
        />
        <LabeledInput
          type="number"
          label="Highest price"
          {...register(fields.pricePerDayMax)}
          className="w-[18ch] block mt-1"
        />
      </fieldset>

      <fieldset>
        <legend className="text-xs font-medium">Entrance Dimensions</legend>
        <LabeledInput
          type="number"
          label="Minimium height"
          className="w-[18ch] block mt-1"
          {...register(fields.entranceHeight)}
        />
        <LabeledInput
          type="number"
          label="Minimium width"
          className="w-[18ch] block mt-1"
          {...register(fields.entranceWidth)}
        />
      </fieldset>

      <fieldset>
        <legend className="text-xs font-medium">
          Storage Space (minimum 10 sq. feet)
        </legend>
        <LabeledInput
          type="number"
          className="w-[18ch] block mt-1"
          {...register(fields.storageSpace)}
        />
      </fieldset>

      <fieldset className="max-w-44">
        <legend className="text-xs font-medium">Star Rating</legend>
        <input
          type="range"
          className="range range-sm range-primary"
          min={1}
          max={5}
          step={1}
          {...register(fields.starRating)}
        />
        <span className="flex justify-between mx-1 *:text-sm">
          <b>1</b>
          <b>2</b>
          <b>3</b>
          <b>4</b>
          <b>5</b>
        </span>
      </fieldset>

      <fieldset className="columns-2 xs:columns-3">
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

      <fieldset>
        <legend className="text-xs font-medium">Type</legend>
        {typesArray.map(({ text }) => (
          <LabeledInput
            label={text}
            key={text}
            id={text}
            value={text}
            {...register(fields.type)}
            type="checkbox"
            className="cursor-pointer scale-75"
          />
        ))}
      </fieldset>

      <fieldset className="flex basis-full justify-between border-t border-gray-200 px-5 py-3 mt-6">
        <button
          type="button"
          onClick={doReset}
          className="btn btn-xs btn-link text-info">
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
