import { forwardRef } from "react";
import PasswordField from "./PasswordField";

const LabeledInput = forwardRef(({ label, as, className, ...props }, ref) => {
  const useId = props.id ?? props.name;

  if (props.type === "password") {
    const forwardProps = { label, className, useId, ...props };
    return <PasswordField ref={ref} {...forwardProps} />;
  }

  const customStyles = `
    ${
      ["checkbox", "radio", "file"].includes(props.type)
        ? ""
        : "input bg-yellow-100 input-bordered"
    }
    ${props.type == "number" ? "input-sm" : ""}
    ${props.type == "checkbox" ? "checkbox checkbox-accent" : ""}
    ${props.type == "radio" ? "radio radio-secondary" : ""}
    ${props.readOnly ? "opacity-60 cursor-not-allowed font-bold" : ""}
    ${props.disabled ? "opacity-60 cursor-not-allowed font-bold" : ""}
    ${props.type == "file" ? "file-input bg-inherit file-input-bordered" : ""}
  `;

  if (props.type == "radio" || props.type == "checkbox") {
    return (
      <div className={`flex items-center gap-3`}>
        <input
          id={useId}
          ref={ref}
          className={`${customStyles} ${className}`}
          {...props}
        />
        <label className="label-text cursor-pointer" htmlFor={useId}>
          {label}
        </label>
      </div>
    );
  }

  const Input = as ? "textarea" : "input";

  return (
    <>
      <label className="label-text" htmlFor={useId}>
        {label}
      </label>
      <Input
        ref={ref}
        id={useId}
        className={`${customStyles} ${className}`}
        {...props}
      />
    </>
  );
});

LabeledInput.displayName = "LabeledInput";

export default LabeledInput;
