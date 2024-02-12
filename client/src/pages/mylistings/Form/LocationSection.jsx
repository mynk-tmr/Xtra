import { getLocationDetails } from "@/libs/utils/getLocationDetails";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import Fieldset from "@/components/Fieldset";
import { toast } from "react-toastify";

const LocationSection = () => {
  const { register, watch } = useFormContext();
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: "newlistingLocation",
    queryFn: () => {
      let ele = document.getElementById("pincode");
      return getLocationDetails(ele.value);
    },
    refetchOnWindowFocus: false,
    enabled: false,
    onError: function () {
      toast.error("Pincode is invalid !");
    },
  });
  return (
    <Fieldset legend="Add Location" disabled={isLoading}>
      <section>
        <label htmlFor="pincode">Enter Pincode</label>
        <input
          type="number"
          id="pincode"
          {...register("pincode", {
            required: "Pincode is required",
            validate: function () {
              if (watch("state") && watch("city") && watch("locality"))
                return true;
              return "Please confirm Pincode !";
            },
          })}
        />
        <button type="button" onClick={refetch}>
          {data && !isError ? "Change pincode" : "Confirm"}
        </button>
      </section>
      {data && !isError && (
        <section>
          <input
            id="state"
            readOnly={true}
            value={data.state}
            {...register("state")}
          />
          <input
            id="city"
            readOnly={true}
            value={data.city}
            {...register("city")}
          />
        </section>
      )}
      {data?.localities && !isError && (
        <section>
          <label htmlFor="locality">Select Locality :</label>
          <select
            id="locality"
            {...register("locality", {
              required: "Please select a locality",
            })}>
            {data.localities.map((locality) => (
              <option key={locality} value={locality}>
                {locality}
              </option>
            ))}
          </select>
        </section>
      )}
    </Fieldset>
  );
};

export default LocationSection;
