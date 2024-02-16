import Fieldset from "@/components/Fieldset";
import ImagePreviewer from "@/components/ImagePreviewer";
import LabeledInput from "@/components/LabeledInput";
import fields from "@/config/createLisitingFields";
import useImagePreviewer from "@/libs/hooks/useImagePreviewer";
import { TrashIcon } from "@heroicons/react/16/solid";
import { useFormContext } from "react-hook-form";

const ImageUploadSection = () => {
  const { images, changeImages, clearImages } = useImagePreviewer();
  const { register, watch, setValue } = useFormContext();
  const imageUrls = watch("imageUrls");
  //we have to append to formdata new imageUrls that user has modified
  // in addition to listingImages (new uploads)

  return (
    <Fieldset legend="Add Images">
      <LabeledInput
        {...register(fields.listingImages, {
          validate: (files) => {
            let length = files.length + (imageUrls?.length || 0);
            if (!length || length > 6)
              return "You have to pick 1-6 images in total";
          },
        })}
        label={"Upload images of your storage (max 6)"}
        accept="image/*"
        type="file"
        multiple
        onDrop={(e) => {
          e.preventDefault();
          e.target.files = e.dataTransfer.files;
          clearImages();
          changeImages(e);
        }}
        onChange={(e) => {
          clearImages();
          changeImages(e);
        }}
      />
      <small className="text-info font-semibold">
        Good pictures are really important to generate interest in your listing
        !
      </small>
      {!images.length ? null : (
        <section>
          <h4 className="!text-error">
            Images to be uploaded (first image will be thumbnail)
          </h4>
          <ImagePreviewer files={images} />
        </section>
      )}
      {imageUrls && (
        <section className="border-t-4">
          <h4 className="!text-error">Previously selected images</h4>
          <ImagePreviewer
            urlArray={imageUrls}
            renderControlBtns={(url) => (
              <span
                className="flex"
                onClick={() =>
                  setValue(
                    "imageUrls",
                    imageUrls.filter((thisUrl) => thisUrl !== url)
                  )
                }>
                <TrashIcon className="w-6" /> Delete
              </span>
            )}
          />
        </section>
      )}
    </Fieldset>
  );
};

export default ImageUploadSection;
