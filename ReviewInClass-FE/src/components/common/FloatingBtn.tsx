import { useNavigate } from "react-router-dom";
import palette from "../../styles/theme";

import Logo from "../../assets/icon-link-write.svg";
import Arrow from "../../assets/arrow/icon-arrow-up.svg";

const FloatingBtn = () => {
  const navigate = useNavigate();

  const handleCilckMenu = () => {
    scrollToTop();
    navigate("/create");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col gap-[15px] fixed right-[20px] bottom-[20px] z-[1000]">
      <div
        onClick={handleCilckMenu}
        className="w-[52px] h-[52px] flex rounded-[50%] items-center justify-center cursor-pointer"
        style={{ backgroundColor: palette.button, boxShadow: "0px 0px 12.32px 0px #00000026" }}
      >
        <div className="w-[30.29px] h-[30.29px]">
          <img src={Logo} alt="로고" className="w-full h-full object-contain" />
        </div>
      </div>

      <div
        onClick={scrollToTop}
        className="w-[52px] h-[52px] flex rounded-[50%] items-center justify-center cursor-pointer"
        style={{ backgroundColor: palette.white, boxShadow: "0px 0px 12.32px 0px #00000026" }}
      >
        <div className="w-[13.55x] h-[15.55px]">
          <img src={Arrow} alt="위로이동" className="w-full h-full object-contain" />
        </div>
      </div>
    </div>
  );
};

export default FloatingBtn;
