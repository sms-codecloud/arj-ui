const InputTextArea = ({
  id,
  name,
  value,
  className,
  placeholder,
  onChange,
  maxLength,
}) => (
  <textarea
    id={id}
    name={name}
    value={value}
    className={className}
    placeholder={placeholder}
    onChange={onChange}
    maxLength={maxLength}
  />
);

export default InputTextArea;
