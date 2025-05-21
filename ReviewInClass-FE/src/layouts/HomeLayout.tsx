import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import FloatingBtn from "../components/common/FloatingBtn";

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <FloatingBtn />
      <main className="pt-[93px]">
        <Outlet />
      </main>
    </>
  );
};

export default HomeLayout;
