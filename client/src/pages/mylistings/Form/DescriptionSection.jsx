import Fieldset from "@/components/Fieldset";
import { useFormContext } from "react-hook-form";

const DescriptionSection = () => {
  const { register } = useFormContext();
  return (
    <Fieldset legend="Add Details">
      <label htmlFor="description">Give a description</label>
      <textarea
        id="description"
        {...register("description", {
          required: "Description is required",
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
            min: 0,
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
            min: 0,
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
            required: "Stoarage space is required",
            min: 0,
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
            required: "Price is required",
            min: 0,
          })}
        />
        <label htmlFor="discount" className="ml-6">
          Discount
        </label>
        <input
          id="discount"
          defaultValue={0}
          type="number"
          {...register("discount", {
            min: 0,
          })}
        />
      </section>
    </Fieldset>
  );
};

export default DescriptionSection;
