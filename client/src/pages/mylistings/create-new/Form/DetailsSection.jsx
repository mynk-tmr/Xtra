import Fieldset from "@/components/Fieldset";
import { useFormContext } from "react-hook-form";
import LabeledInput from "@/components/LabeledInput";

function createRegisterOptions(label, minvalue, unit, validate) {
  return {
    valueAsNumber: true,
    required: `${label} is required !`,
    min: {
      value: minvalue,
      message: `${label} must be atleast ${minvalue} ${unit}`,
    },
    validate,
  };
}

const DetailsSection = () => {
  return (
    <Fieldset legend="Add Details">

      <LabeledInput name="description" tag="textarea" className="!h-[15ch]"
        label={<span>Give a description <small>(atleast 20 characters)</small></span>}
      />

      <section>
        <h4>Provide Entrance Dimensions</h4>
        <LabeledInput name="entranceWidth" tag="input" type="number"
          label={<span>Width <small>(feet)</small></span>}
        />
        <LabeledInput name="entranceHeight" tag="input" type="number"
          label={<span>Height <small>(feet)</small></span>}
        />
      </section>

      <section>
        <LabeledInput name="storageSpace" tag="input" type="number"
          label={<span>Storage Space <small>(square feet)</small></span>}
        />
      </section>

      <section>
        <h4>Pricing Information <b className="text-info">(₹ / day)</b></h4>
        <LabeledInput name="pricePerDay" tag="input" type="number"
          label={"Price"}
        />
        <LabeledInput name="discount" tag="input" type="number"
          label={"Discount"}
        />
      </section>
    </Fieldset>
  );
};

export default DetailsSection;
