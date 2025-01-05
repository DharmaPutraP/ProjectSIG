import { Outlet } from "react-router-dom";
import { Header } from "../components";
import Footer from "./Footer";

const HomeLayout = () => {
  return (
    <div className="container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeLayout;
