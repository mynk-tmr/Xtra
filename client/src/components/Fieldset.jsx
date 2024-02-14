import { forwardRef } from "react";

const Fieldset = forwardRef((props, ref) => {
  const { legend, children, className, ...rest } = props;
  return (
    <fieldset
      ref={ref}
      {...rest}
      className={`
      grid gap-4 p-4 pb-8 card-bordered rounded-box bg-white
      [&_h4]:label-text [&_h4]:font-bold
      [&_button]:btn [&_button]:btn-sm
      [&_section]:form-control [&_section]:gap-2
      ${className}
      `}>
      <legend className="text-center text-xl font-bold bg-white px-4 rounded-md border-t border-gray-200">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
});

Fieldset.displayName = "Fieldset";

export default Fieldset;
