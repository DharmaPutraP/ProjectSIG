import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toLogout } from "../utils/api";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await toLogout();

        // Clear user data from localStorage
        localStorage.removeItem("user");

        toast.success("Berhasil Logout");

        // Redirect to login page
        navigate("/");
      } catch (error) {
        toast.error("Error logging out. Please try again.");
        navigate("/login"); // Redirect to login even if logout fails
      }
    };

    performLogout();
  }, [navigate]);

  return null; // Render nothing
};
export default Logout;
