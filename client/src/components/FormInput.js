const FormInput = ({
  type,
  name,
  labelText,
  value,
  onChange,
  style,
  placeholder,
  disabled = false,
  icon = true,
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
          className={`form-input`}
          placeholder={placeholder}
          value={value || ""}
          onChange={onChange}
          required
          disabled={disabled}
        />
        {icon && (
          <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
export default FormInput;
