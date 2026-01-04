const InputText = ({
  type,
  id,
  name,
  value,
  className,
  placeholder,
  onChange,
}) => {
  return (
    <>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
};

export default InputText;
