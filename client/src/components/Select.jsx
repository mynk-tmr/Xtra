import { forwardRef } from "react";

const Select = forwardRef(({ label, className, options, ...props }, ref) => {
  const customStyles = "select select-sm border-info border-2 ml-4 bg-white";
  return (
    <div>
      <label htmlFor={props.name}>{label}</label>
      <select
        id={props.name}
        ref={ref}
        name={props.name}
        className={`${customStyles} ${className}`}
        {...props}>
        <option key={"dummy"} disabled value={0}>
          Click to Open
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

Select.displayName = "Select";

export default Select;
