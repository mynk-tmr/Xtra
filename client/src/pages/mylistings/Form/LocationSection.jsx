import { getLocationDetails } from "@/libs/utils/getLocationDetails";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";

const LocationSection = () => {
  const { register } = useFormContext();
  const { isLoading, data, refetch } = useQuery({
    queryKey: "newlistingLocation",
    queryFn: () => {
      let ele = document.getElementById("pincode");
      return getLocationDetails(ele.value);
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });

  return (
    <fieldset disabled={isLoading}>
      <legend className={legendStyles}>Add Location</legend>
      <div>
        <label>Enter Pincode :</label>
        <input type="number" id="pincode" {...register("pincode")} />
        <button type="button" onClick={refetch}>
          Confirm
        </button>
      </div>
      {data && (
        <div>
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
        </div>
      )}
      {data?.localities && (
        <div>
          <label>Select Locality :</label>
          <select id="locality" {...register("locality")}>
            {data.localities.map((locality) => (
              <option key={locality} value={locality} selected>
                {locality}
              </option>
            ))}
          </select>
        </div>
      )}
    </fieldset>
  );
};

export default LocationSection;
