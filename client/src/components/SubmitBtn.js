import { useNavigation } from "react-router-dom";
const SubmitBtn = ({ formBtn, className }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <button
      type="submit"
      className={`btn w-full ${formBtn && "form-btn"} ${className}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  );
};
export default SubmitBtn;
