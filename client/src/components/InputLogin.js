const InputLogin = ({
  type,
  name,
  labelText,
  defaultValue,
  style,
  placeholder,
  disabled = false,
  className,
}) => {
  return (
    <div className={`sm:mb-[1rem] w-60 ${className}`} style={style}>
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <div className="relative w-full">
        <input
          type={type}
          name={name}
          className="form-input"
          placeholder={placeholder}
          defaultValue={defaultValue || ""}
          required
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default InputLogin;
