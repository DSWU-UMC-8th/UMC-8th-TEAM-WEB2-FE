import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default HomeLayout;
