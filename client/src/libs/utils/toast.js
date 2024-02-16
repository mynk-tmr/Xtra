import { toast } from "react-toastify";

export function notifyFormError(errors) {
  setTimeout(() => {
    let firstBad = document.activeElement;
    toast.error(errors[firstBad.name].message);
  }, 0);
}

export function notifySuccess(message) {
  toast.success(message);
}

export function notifyError(error) {
  let message;
  if (typeof error == "string") message = error;
  else message = error.message;
  toast.error(message + "😟");
}
