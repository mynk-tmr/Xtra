import useToggle from "@/libs/hooks/useToggle";
import { forwardRef } from "react";
import {
  EyeIcon as Show,
  EyeSlashIcon as Hide,
} from "@heroicons/react/16/solid";

const PasswordField = forwardRef((props, ref) => {
  const { label, useId, className, ...rest } = props;
  const [visibile, toggle] = useToggle(false);
  return (
    <>
      <label className="label-text" htmlFor={useId}>
        {label}
      </label>
      <div className="relative grid items-center">
        <input
          ref={ref}
          id={props.useId}
          className={`input bg-yellow-100 input-sm input-bordered font-semibold ${className}`}
          {...rest}
          //this should be atlast to override all
          type={visibile ? "text" : "password"}
        />
        <span className="absolute p-2 right-0" onClick={toggle}>
          {visibile ? <Hide className="w-6" /> : <Show className="w-6" />}
        </span>
      </div>
    </>
  );
});

PasswordField.displayName = "PasswordField";

export default PasswordField;
