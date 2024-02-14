import Fieldset from "@/components/Fieldset";
import ImagePreviewer from "@/components/ImagePreviewer";
import LabeledInput from "@/components/LabeledInput";
import fields from "@/config/createLisitingFields";
import useImagePreviewer from "@/libs/hooks/useImagePreviewer";
import { useFormContext } from "react-hook-form";

const ImageUploadSection = () => {
  const { images, changeImages, clearImages } = useImagePreviewer();
  const $ = (q) => document.getElementById(q);
  const { register } = useFormContext();

  return (
    <Fieldset legend="Add Images">
      <LabeledInput
        {...register(fields.listingImages, {
          validate: (files) => {
            if (!files || files.length > 6) return "Pick 1-6 images !";
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
        <>
          <button
            type="button"
            className="w-fit btn-accent"
            onClick={() => $("imagePreview").showModal()}>
            Preview Images
          </button>
          <dialog id="imagePreview" className="modal">
            <section className="modal-box w-11/12 max-w-5xl bg-neutral">
              <ImagePreviewer files={images} />
            </section>
            <div className="modal-action -translate-y-14">
              <button
                type="button"
                onClick={() => $("imagePreview").close()}
                className="btn-warning !btn-circle btn-lg">
                X
              </button>
            </div>
          </dialog>
        </>
      )}
    </Fieldset>
  );
};

export default ImageUploadSection;
