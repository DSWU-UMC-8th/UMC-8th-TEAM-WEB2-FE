import { useState } from "react";
import palette from "../../styles/theme";

import Logo from "../../assets/icon-logo.svg";
import LogoText from "../../assets/navbar/review-in-class.png";
import Home from "../../assets/navbar/icon-navbar-home.svg";
import Popular from "../../assets/navbar/icon-navbar-popular.svg";
import Latest from "../../assets/navbar/icon-navbar-latest.svg";
import Search from "../../assets/navbar/icon-navbar-search.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const { setSearch } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();
  const [clickedPath, setClickedPath] = useState<string | null>(null);

  const handleSubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setSearch(searchValue);
      setSearchValue("");
      navigate("/review");
    }
  };

  const handleNavigate = (path: string, setClicked: boolean, sort?: string) => {
    scrollToTop();
    setSearch("");
    if (sort) {
      navigate(`${path}?sort=${sort}`);
    } else {
      navigate(path);
    }

    if (setClicked) {
      setClickedPath(path);
    }
  };

  const isActive = (path: string) => {
    return clickedPath === path;
  };

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav
      className="h-[93px] pt-[16px] pr-[24px] pb-[16px] pl-[24px] flex items-center justify-between fixed top-0 left-0 right-0 z-1000"
      style={{ background: palette["neutral-bg"] }}
    >
      <div className="flex gap-[24px] items-center">
        <div
          onClick={() => {
            handleNavigate("/", false, undefined);
            setClickedPath(null);
          }}
          className="flex items-center gap-[12px] cursor-pointer"
        >
          <div className="w-[35px] h-[35px]">
            <img src={Logo} alt="로고" className="w-full h-full object-contain" />
          </div>
          <div className="w-[181.75px] h-[16.64px]">
            <img src={LogoText} alt="review in class" className="w-full h-full object-contain" />
          </div>
        </div>

        <div className="flex itmes-center">
          <div
            onClick={() => handleNavigate("/", true)}
            className={`flex items-center justify-between cursor-pointer w-[159px] rounded-[8px] pt-[10px] pr-[16px] pb-[10px] pl-[16px] ${
              isActive("/") && "bg-[#C0E5C7]"
            }`}
          >
            <img src={Home} alt="Dashboard" className="w-[20px]" />
            <p className="font-['Poppins'] text-[17px] leading-[20px] tracking-[0%]" style={{ color: palette.nav }}>
              Dashboard
            </p>
          </div>

          <div
            onClick={() => handleNavigate("/review", true, "popular")}
            className={`flex items-center justify-between cursor-pointer  w-[130px] rounded-[8px] pt-[10px] pr-[16px] pb-[10px] pl-[16px] ${
              location.search === "?sort=popular" && "bg-[#C0E5C7]"
            }`}
          >
            <img src={Popular} alt="popular" className="w-[20px]" />
            <p className="font-['Poppins'] text-[17px] leading-[20px] tracking-[0%]" style={{ color: palette.nav }}>
              Popular
            </p>
          </div>

          <div
            onClick={() => handleNavigate("/review", true, "latest")}
            className={`flex items-center justify-between cursor-pointer  w-[115px] rounded-[8px] pt-[10px] pr-[16px] pb-[10px] pl-[16px] ${
              location.search === "?sort=latest" && "bg-[#C0E5C7]"
            }`}
          >
            <img src={Latest} alt="latest" className="w-[20px]" />
            <p className="font-['Poppins'] text-[17px] leading-[20px] tracking-[0%]" style={{ color: palette.nav }}>
              Latest
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[485px] w-full">
        <div className="relative">
          <div className="w-[21.85px] h-[21.85px] absolute top-[50%] translate-y-[-50%] ml-[27.6px]">
            <img src={Search} alt="검색" className="w-full h-full object-contain" />
          </div>
          <input
            value={searchValue}
            placeholder="검색어를 입력해주세요"
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => handleSubmit(e)}
            className="max-w-[485px] w-full h-[46px] pr-[27.6px] pl-[58.65px] rounded-[46px] placeholder:font-['Pretendard'] placeholder:text-[18.4px] outline-none"
            style={{ background: palette.white }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
