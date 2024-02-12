import Fieldset from "@/components/Fieldset";
import { useFormContext } from "react-hook-form";

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
  const { register, watch } = useFormContext();
  return (
    <Fieldset legend="Add Details">
      <label htmlFor="description">
        Give a description <small>(atleast 20 characters)</small>
      </label>
      <textarea
        id="description"
        className="!h-[15ch]"
        {...register("description", {
          validate: function (desc) {
            return desc && desc.length > 19
              ? true
              : "Please provide a description of 20 characters at minimum";
          },
        })}
      />
      <section>
        <h4>Provide Entrance Dimensions</h4>
        <label htmlFor="entraceDimensions_width">
          Width <small>(feet)</small>
        </label>
        <input
          id="entraceDimensions_width"
          type="number"
          {...register(
            "entraceDimensions_width",
            createRegisterOptions("Width", 1, "feet")
          )}
        />
        <label htmlFor="entraceDimensions_height">
          Height <small>(feet)</small>
        </label>
        <input
          id="entraceDimensions_height"
          type="number"
          {...register(
            "entraceDimensions_height",
            createRegisterOptions("Height", 1, "feet")
          )}
        />
      </section>
      <section>
        <label htmlFor="storageSpace">
          <b>Storage Space</b> <small>(square per feet)</small>
        </label>
        <input
          id="storageSpace"
          type="number"
          {...register(
            "storageSpace",
            createRegisterOptions("Storage Space", 10, "feet")
          )}
        />
      </section>
      <section>
        <h4>
          Pricing Information <b className="text-info">(₹ / day)</b>
        </h4>
        <label htmlFor="pricePerDay">Price</label>
        <input
          id="pricePerDay"
          type="number"
          {...register(
            "pricePerDay",
            createRegisterOptions("Price", 1, "₹ / day")
          )}
        />
        <label htmlFor="discount">Discount</label>
        <input
          id="discount"
          type="number"
          {...register(
            "discount",
            createRegisterOptions(
              "Discount",
              0,
              "₹ / day",
              function (discount) {
                return discount < watch("pricePerDay")
                  ? true
                  : "Discount must be lower than Price";
              }
            )
          )}
        />
      </section>
    </Fieldset>
  );
};

export default DetailsSection;
