import Fieldset from "@/components/Fieldset";
import ImagePreviewer from "@/components/ImagePreviewer";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

const ImageUploadSection = () => {
  const { register, watch } = useFormContext();
  const [images, setImages] = useState([]);
  const imagePreviewDialog = useRef(null);
  const openPreviewer = () => imagePreviewDialog.current.showModal();
  const closePreview = () => imagePreviewDialog.current.close();

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
          onChange: () => setImages(watch("listingImages")),
          validate: function (files) {
            if (!files.length) return "Please select atleast 1 image";
            if (files.length > 6) return "Maximum 6 images are allowed ..";
            return true;
          },
        })}
      />
      {!images.length ? null : (
        <>
          <button
            type="button"
            className="w-fit btn-accent"
            onClick={openPreviewer}>
            Preview Images
          </button>
          <dialog ref={imagePreviewDialog} className="modal">
            <section className="modal-box w-11/12 max-w-5xl bg-neutral">
              <ImagePreviewer files={images} />
            </section>
            <div className="modal-action -translate-y-14">
              <button
                type="button"
                onClick={closePreview}
                className="btn-warning !btn-wide">
                Close
              </button>
            </div>
          </dialog>
        </>
      )}
    </Fieldset>
  );
};

export default ImageUploadSection;
