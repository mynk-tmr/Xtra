const Fieldset = ({ legend, children }) => {
  return (
    <fieldset
      className={`
      grid gap-4 p-4 card-bordered rounded-box bg-white

      [&_label]:label-text

      [&_h4]:font-bold [&_h4]:label-text

      [&_input[type="text"]]:input [&_input[type="text"]]:bg-warning/30

      [&_input[type="number"]]:input [&_input[type="number"]]:bg-warning/30
      [&_input[type="number"]]:w-[11ch] [&_input[type="number"]]:!input-sm [&_input[type="number"]]:ml-4

      [&_textarea]:textarea [&_textarea]:bg-warning/30
      `}>
      <legend className="text-center text-xl font-bold bg-white px-4 rounded-md">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
};

export default Fieldset;
