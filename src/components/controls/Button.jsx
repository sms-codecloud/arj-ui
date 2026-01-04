const Button = ({ text, type, className, disabled, onClick }) => {
  return (
    <>
      <button
        className={className}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
