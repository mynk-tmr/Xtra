import Fieldset from "@/components/Fieldset";
import { useFormContext } from "react-hook-form";

const DescriptionSection = () => {
  const { register, watch } = useFormContext();
  return (
    <Fieldset legend="Add Details">
      <label htmlFor="description">
        Give a description <small>(atleast 20 characters)</small>
      </label>
      <textarea
        id="description"
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
          {...register("entraceDimensions_width", {
            required: "Width of Entrance is required",
            min: {
              value: 1,
              message: "Entrace width must be atleast 1 feet",
            },
          })}
        />
        <label htmlFor="entraceDimensions_height" className="ml-6">
          Height <small>(feet)</small>
        </label>
        <input
          id="entraceDimensions_height"
          type="number"
          {...register("entraceDimensions_height", {
            required: "Height of Entrance is required",
            min: {
              value: 1,
              message: "Entrace width must be atleast 1 feet",
            },
          })}
        />
      </section>
      <section>
        <label htmlFor="storageSpace">
          <b>Storage Space</b> <small>(square per feet)</small>
        </label>
        <input
          id="storageSpace"
          type="number"
          {...register("storageSpace", {
            required: "Storage space is required",
            min: {
              value: 10,
              message: "Storage space must be atleast 10 square feet",
            },
          })}
        />
      </section>
      <section className="[&_input]:!w-[13ch]">
        <h4>Pricing Information (₹ / day)</h4>
        <label htmlFor="pricePerDay">Price</label>
        <input
          id="pricePerDay"
          type="number"
          {...register("pricePerDay", {
            valueAsNumber: true,
            validate: function (price) {
              if (!price || price < 1) return "Price must be atleast 1";
              return true;
            },
          })}
        />
        <label htmlFor="discount" className="ml-6">
          Discount
        </label>
        <input
          id="discount"
          type="number"
          {...register("discount", {
            valueAsNumber: true,
            validate: function (discount) {
              if (!discount || discount < 0)
                return "Discount must be 0 or more";
              if (discount > watch("pricePerDay"))
                return "Discount can't be more than price.";
              return true;
            },
          })}
        />
      </section>
    </Fieldset>
  );
};

export default DescriptionSection;
