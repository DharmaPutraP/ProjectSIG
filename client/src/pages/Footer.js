import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const excludedPaths = ["/", "/admin", "/admin/create"];
  const shouldShowFooter = !excludedPaths.includes(location.pathname);
  return (
    <>
      {shouldShowFooter && (
        <div className="flex justify-between mt-5 pt-2 mb-2 w-full text-center border-t-4 border-green-300">
          <p className="text-sm sm:text-md">
            © 2025 Fortune. All Rights Reserved.
          </p>
          <a
            href={`https://api.whatsapp.com/send/?phone=6282164341675`}
            className="text-green-500 flex"
          >
            <img
              src={`${process.env.REACT_APP_MARKERICON_URI}/whatsappIcon.png`}
              width={23}
              className="me-1"
            />
            Contact Us
          </a>
        </div>
      )}
    </>
  );
};
export default Footer;
