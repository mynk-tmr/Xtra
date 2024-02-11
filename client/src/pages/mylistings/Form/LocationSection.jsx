import { getLocationDetails } from "@/libs/utils/getLocationDetails";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import Fieldset from "@/components/Fieldset";
import { toast } from "react-toastify";

const LocationSection = () => {
  const { register } = useFormContext();
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
        <label htmlFor="pincode" className="mr-8">
          Enter Pincode :
          <input
            type="number"
            min="100000"
            max="999999"
            id="pincode"
            className="!w-[13ch]"
            {...register("pincode", {
              required: "Pincode is required",
            })}
          />
        </label>
        <button type="button" onClick={refetch}>
          Confirm
        </button>
      </section>
      {data && !isError && (
        <section className="*:badge *:badge-success *:mr-4">
          <input
            id="state"
            disabled={true}
            value={data.state}
            {...register("state")}
          />
          <input
            id="city"
            disabled={true}
            value={data.city}
            {...register("city")}
          />
        </section>
      )}
      {data?.localities && !isError && (
        <section>
          <label>Select Locality :</label>
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
