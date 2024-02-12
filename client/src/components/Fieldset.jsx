import * as styles from "./Fieldset.module.css";

const Fieldset = ({ legend, children, className, ...props }) => {
  return (
    <fieldset {...props} className={` ${styles.fieldset} ${className}`}>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  );
};

export default Fieldset;
