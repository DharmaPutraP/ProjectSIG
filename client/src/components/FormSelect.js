const FormSelect = ({
  name,
  labelText,
  value,
  onChange,
  options,
  className,
  defaults = true,
}) => {
  return (
    <div className={`sm:mb-[1rem] w-60 ${className}`}>
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        className={`form-input`}
        onChange={onChange}
      >
        {defaults && <option value="">Semua</option>}
        {options.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormSelect;
