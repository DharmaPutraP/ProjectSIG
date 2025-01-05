const Button = ({ className, children, handleClick }) => {
  return (
    <button
      type="button"
      className={`btn w-3/6 ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
export default Button;
