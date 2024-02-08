import "@fontsource-variable/azeret-mono";

const Xtralogo = ({ className }) => (
  <span
    style={{
      fontFamily: "Azeret Mono Variable, Lato, sans-serif",
    }}
    className={`
    tracking-wider
    inline-block
    ${className}
  `}>
    <b className="text-primary">Xt</b>
    <b className="text-secondary">ra</b>
  </span>
);

export default Xtralogo;
