import Fieldset from "@/components/Fieldset";
import { useFormContext } from "react-hook-form";

const FacilitiesSection = () => {
  const { register } = useFormContext();
  return (
    <Fieldset legend="Add Features">
      <section className="!grid !grid-cols-fillxs *:flex *:items-center">
        <h4 className="col-span-full">Facilities available</h4>
        {[
          "Guarded Area",
          "Fire Protection",
          "Separate Access",
          "Pest Control",
          "Security Cameras",
          "Climate Control",
          "Cold Storage",
          "E-LockSystem",
        ].map((facility) => (
          <label key={facility} htmlFor={facility} className="cursor-pointer">
            <input
              type="checkbox"
              id={facility}
              value={facility}
              className="checkbox checkbox-accent mr-3"
              {...register("facilities", {
                validate: function (facilities) {
                  return facilities?.length > 0
                    ? true
                    : "Select atleast 1 facility";
                },
              })}
            />
            {facility}
          </label>
        ))}
      </section>
      <section className="*:flex *:items-center">
        <h4 className="col-span-full">Type</h4>
        {[
          [["Residential"], ["good for household items"]],
          [["Commercial"], ["good for business inventory"]],
          [["Both"]],
        ].map(([id, hint]) => (
          <label key={id} htmlFor={id} className="cursor-pointer">
            <input
              type="radio"
              id={id}
              value={id}
              className="radio radio-secondary mr-3"
              {...register("type", {
                required: "Select atleast one Type",
              })}
            />
            <span className="flex items-center gap-4">
              <b>{id}</b>
              {hint}
            </span>
          </label>
        ))}
      </section>
    </Fieldset>
  );
};

export default FacilitiesSection;
