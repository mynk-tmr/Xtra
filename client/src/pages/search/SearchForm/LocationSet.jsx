import Select from "@/components/Select";
import LabeledInput from "@/components/LabeledInput";
import { useQuery } from "react-query";
import { getLocationDetails } from "@/libs/utils/getLocationDetails";
import { notifyError } from "@/libs/utils/toast";

const LocationSet = ({ register, getValues, fields }) => {
  const { data, isLoading, refetch, isError } = useQuery({
    queryFn: () => getLocationDetails(getValues("pincode")),
    onError: () => {
      notifyError("Pincode is invalid");
    },
    enabled: false,
  });

  return (
    <fieldset disabled={isLoading} className="grid gap-y-3">
      <legend className="text-xs font-medium">Location</legend>
      <div>
        <LabeledInput
          label="Pincode"
          className="w-[18ch] m-1 mr-2"
          {...register(fields.pincode)}
        />
        <button
          onClick={refetch}
          type="button"
          className="btn btn-sm btn-warning">
          Confirm
        </button>
      </div>
      {data?.localities && !isError && (
        <Select
          label={<span className="text-sm">Pick Locality</span>}
          options={data.localities}
          {...register(fields.locality, {
            value: 0,
          })}
        />
      )}
    </fieldset>
  );
};

export default LocationSet;
