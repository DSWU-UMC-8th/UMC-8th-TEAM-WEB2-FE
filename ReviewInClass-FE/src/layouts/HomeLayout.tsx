import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import FloatingBtn from "../components/common/FloatingBtn";

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <FloatingBtn />
      <Outlet />
    </>
  );
};

export default HomeLayout;
