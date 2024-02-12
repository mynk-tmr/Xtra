import Fieldset from "@/components/Fieldset";
import { useFormContext } from "react-hook-form";

const ImageUploadSection = () => {
  const { register } = useFormContext();
  return (
    <Fieldset legend="Add Images">
      <label htmlFor="listingImages">Upload images of your storage</label>
      <small className="text-info font-semibold">
        Good pictures are really important to generate interest in your listing
        !
      </small>
      <input
        accept="image/*"
        type="file"
        multiple
        id="listingImages"
        {...register("listingImages", {
          validate: function (files) {
            if (!files.length) return "Please select atleast 1 image";
            if (files.length > 6) return "Maximum 6 images are allowed ..";
            return true;
          },
        })}
      />
    </Fieldset>
  );
};

export default ImageUploadSection;
