import Fieldset from "@/components/Fieldset";
import { useFormContext } from "react-hook-form";
import LabeledInput from "@/components/LabeledInput";
import fields from "@/config/createLisitingFields";

function createRegisterConfig(label, minvalue, unit, validate) {
  return {
    valueAsNumber: true,
    required: `${label} must be atleast ${minvalue} ${unit}`,
    min: {
      value: minvalue,
      message: `${label} must be atleast ${minvalue} ${unit}`,
    },
    validate,
  };
}

const DetailsSection = () => {
  const { register, watch } = useFormContext();
  return (
    <Fieldset legend="Add Details">
      <LabeledInput
        {...register(fields.description, {
          validate: (val) => {
            if (!val || val.length < 20)
              return "Description does not match required format";
            return true;
          },
        })}
        id={fields.description}
        as="textarea"
        className="!h-[15ch]"
        label={
          <span>
            Give a description <small>(atleast 20 characters)</small>
          </span>
        }
      />

      <section>
        <h4>Provide Entrance Dimensions</h4>
        <LabeledInput
          {...register(
            fields.entranceWidth,
            createRegisterConfig("Width", 1, "feet")
          )}
          id={fields.entranceWidth}
          type="number"
          label={
            <span>
              Width <small>(feet)</small>
            </span>
          }
        />
        <LabeledInput
          {...register(
            fields.entranceHeight,
            createRegisterConfig("Height", 1, "feet")
          )}
          id={fields.entranceHeight}
          type="number"
          label={
            <span>
              Height <small>(feet)</small>
            </span>
          }
        />
      </section>

      <section>
        <LabeledInput
          {...register(
            fields.storageSpace,
            createRegisterConfig("Storage Space", 10, "sq. feet")
          )}
          id={fields.storageSpace}
          type="number"
          label={
            <span>
              Storage Space <small>(square feet)</small>
            </span>
          }
        />
      </section>

      <section>
        <h4>
          Pricing Information <b className="text-info">(₹ / day)</b>
        </h4>
        <LabeledInput
          {...register(
            fields.pricePerDay,
            createRegisterConfig("Price", 1, "₹/day")
          )}
          id={fields.pricePerDay}
          type="number"
          label={"Price"}
        />
        <LabeledInput
          {...register(
            fields.discount,
            createRegisterConfig("Discount", 0, "₹/day", (discount) => {
              if (watch(fields.pricePerDay) <= discount)
                return "Discount must be lower than Price";
            })
          )}
          id={fields.discount}
          type="number"
          label={"Discount"}
        />
      </section>
    </Fieldset>
  );
};

export default DetailsSection;
