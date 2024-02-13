const LabeledInput = ({ name, label, tag, ...props }) => {
  if (!tag) throw new SyntaxError('Missing tag in ' + name + ' LabeledInput');
  const Input = tag;
  return <>
    <label htmlFor={name}>{label}</label>
    <Input id={name} name={name} {...props} />
  </>;
};

export default LabeledInput;