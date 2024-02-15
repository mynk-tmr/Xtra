import { getLocationDetails } from "@/libs/utils/getLocationDetails";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import Fieldset from "@/components/Fieldset";
import LabeledInput from "@/components/LabeledInput";
import fields from "@/config/createLisitingFields";
import Select from "@/components/Select";
import { notifyError } from "@/libs/utils/toast";

const LocationSection = () => {
  const { register, watch, setValue } = useFormContext();
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: "newlistingLocation",
    queryFn: async () => {
      let pincode = watch(fields.pincode);
      return await getLocationDetails(pincode);
    },
    refetchOnWindowFocus: false,
    enabled: false,
    onError: function () {
      notifyError("Pincode is invalid !");
      setValue(fields.state, undefined);
      setValue(fields.city, undefined);
      setValue(fields.locality, undefined);
    },
  });
  return (
    <Fieldset legend="Add Location" disabled={isLoading}>
      <section>
        <LabeledInput
          id={fields.pincode}
          {...register(fields.pincode, {
            required: "Please confirm pincode !",
            validate: () => {
              if (watch(fields.state) && watch(fields.city)) return true;
              return "Please confirm Pincode !";
            },
          })}
          type="number"
        />
        <button type="button" onClick={refetch}>
          {data && !isError ? "Change pincode" : "Confirm"}
        </button>
      </section>
      {data && !isError && (
        <section>
          <LabeledInput
            id={fields.state}
            {...register(fields.state)}
            readOnly={true}
            value={data.state}
            {...register("state")}
          />
          <LabeledInput
            id={fields.city}
            {...register(fields.city)}
            readOnly={true}
            value={data.city}
          />
        </section>
      )}
      {data?.localities && !isError && (
        <section>
          <Select
            id={fields.locality}
            {...register(fields.locality, {
              validate: (value) => {
                if (value == "__null__") return "Pick your locality";
              },
            })}
            label="Pick your locality:"
            options={data.localities}
          />
        </section>
      )}
    </Fieldset>
  );
};

export default LocationSection;
