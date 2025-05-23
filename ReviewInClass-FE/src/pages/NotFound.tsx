import NotFoundImg from "../assets/not-found.png";
import Navbar from "../components/common/Navbar";

const NotFound = () => {
  return (
    <>
      <Navbar />

      <div className="pt-[93px] flex flex-col gap-[38px] items-center justify-center h-dvh">
        <div className="w-[420px] h-[178.6px]">
          <img src={NotFoundImg} alt="404" className="w-full h-full object-contain" />
        </div>

        <div className="flex flex-col gap-[20.21px] items-center">
          <h2 className="font-bold text-[50px] leading-[100%] tracking-[0]">찾을 수 없는 페이지입니다.</h2>
          <h3 className="font-normal text-[25px] leading-[100%] tracking-[0]">
            요청하신 페이지를 찾을 수 없거나, 잘못된 접근입니다.
          </h3>
        </div>
      </div>
    </>
  );
};

export default NotFound;
