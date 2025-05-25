import Logo from "../assets/icon-logo.svg";
import palette from "../styles/theme";

const Loading = () => {
  return (
    <div className="flex flex-col gap-[37.9px] items-center justify-center h-[80dvh]">
      <div className="flex justify-center items-center w-[252px] h-[252px] relative">
        <div
          className="w-[252px] h-[252px] border-[35px] border-t-[35px] rounded-full animate-spin"
          style={{ borderColor: palette.gray.gray300, borderTopColor: palette.point }}
        ></div>

        <div className="w-[105px] h-[105px] absolute">
          <img src={Logo} alt="로고" className="w-full h-full object-contain" />
        </div>
      </div>

      <p
        className="font-bold text-[50px] leading-[100%] tracking-0"
        style={{ color: palette.gray.gray900 }}
      >
        잠시만 기다려주세요
      </p>
      <p
        className="font-normal text-[25px] leading-[100%] tracking-0"
        style={{ color: palette.gray.gray900 }}
      >
        데이터를 불러오는 중입니다.
      </p>
    </div>
  );
};

export default Loading;
