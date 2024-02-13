import { toast } from "react-toastify";

export default async function createListingAction({ request }) {
  const fData = await request.formData();
  if (!fData.get("description") || fData.get("description").length < 20)
    return notifyError(
      "Description does not match required format",
      "description"
    );
  if (
    !fData.get("entraceDimensions_width") ||
    fData.get("entraceDimensions_width") < 1
  )
    return notifyError(
      "Entrance width must be atleast 1 feet",
      "entraceDimensions_width"
    );
}

function notifyError(message, culprit) {
  if (!culprit) throw new SyntaxError("missing culprit");
  toast.error(message);
  try {
    document.querySelector(`[name=${culprit}]`).focus();
  } catch (error) {
    throw new ReferenceError(
      `Couldn't find any form field with name = ${culprit}`
    );
  }

  return "VALIDATION_ERROR";
}
