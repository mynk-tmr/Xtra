import Fieldset from "@/components/Fieldset";
import LabeledInput from "@/components/LabeledInput";
import {
  createLisitingFields as fields,
  facilitiesArray,
  typesArray,
} from "@/config/listingFields";
import { useFormContext } from "react-hook-form";

const FacilitiesSection = () => {
  const { register } = useFormContext();
  return (
    <Fieldset legend="Add Features">
      <section className="!grid !grid-cols-fillxs *:flex *:items-center">
        <h4 className="col-span-full">Facilities available</h4>
        {facilitiesArray.map((facility) => (
          <LabeledInput
            {...register(fields.facilities, {
              required: "Pick atleast 1 facility !",
            })}
            label={facility}
            key={facility}
            value={facility}
            id={facility}
            type="checkbox"
            className="cursor-pointer"
          />
        ))}
      </section>
      <section className="*:flex *:items-center">
        <h4 className="col-span-full">Type</h4>
        {typesArray.map((type) => (
          <LabeledInput
            {...register(fields.type, {
              required: "Pick atleast 1 Type !",
            })}
            key={type.text}
            id={type.text}
            value={type.text}
            type="radio"
            className="cursor-pointer"
            label={
              <span className="flex gap-4 items-start">
                <b>{type.text}</b>
                {type.hint}
              </span>
            }
          />
        ))}
      </section>
    </Fieldset>
  );
};

export default FacilitiesSection;
