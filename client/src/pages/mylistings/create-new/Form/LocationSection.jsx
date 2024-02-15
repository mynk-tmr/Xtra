import { getLocationDetails } from "@/libs/utils/getLocationDetails";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import Fieldset from "@/components/Fieldset";
import LabeledInput from "@/components/LabeledInput";
import fields from "@/config/createLisitingFields";
import Select from "@/components/Select";
import { notifyError, notifySuccess } from "@/libs/utils/toast";

const LocationSection = () => {
  const { register, getValues } = useFormContext();
  const { isLoading, data, refetch } = useQuery({
    queryKey: "newlistingLocation",
    queryFn: async () => {
      let pincode = getValues(fields.pincode);
      return await getLocationDetails(pincode);
    },
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: function () {
      notifySuccess("Pincode changed !");
    },
    onError: function () {
      notifyError("Pincode is invalid !");
    },
  });

  return (
    <Fieldset legend="Add Location" disabled={isLoading}>
      <LabeledInput
        id={fields.pincode}
        {...register(fields.pincode, {
          required: "Please confirm pincode !",
          validate: () => {
            if (getValues(fields.state) && getValues(fields.city)) return true;
            return "Please confirm Pincode !";
          },
        })}
        type="number"
      />
      <button type="button" onClick={refetch}>
        {getValues(fields.state) ? "Change pincode" : "Confirm"}
      </button>

      <LabeledInput
        id={fields.state}
        {...register(fields.state)}
        readOnly={true}
        value={data?.state ?? getValues(fields.state)}
      />

      <LabeledInput
        id={fields.city}
        {...register(fields.city)}
        readOnly={true}
        value={data?.city ?? getValues(fields.city)}
      />
      <Select
        id={fields.locality}
        {...register(fields.locality, {
          validate: (value) => {
            if (value == "__null__") return "Pick your locality";
          },
        })}
        label="Pick your locality:"
        options={data?.localities ?? [getValues(fields.locality)]}
      />
    </Fieldset>
  );
};

export default LocationSection;
