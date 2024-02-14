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
        defaultValue={"__null__"}
        className={`${customStyles} ${className}`}
        {...props}>
        <option disabled value={"__null__"}>
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
