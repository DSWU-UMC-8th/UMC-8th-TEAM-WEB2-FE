import EMPTY from "../assets/icon-empty-result.svg";
import { useSearch } from "../context/SearchContext";
import palette from "../styles/theme";

const NoResult = () => {
  const { search } = useSearch();
  return (
    <div className="flex flex-col items-center justify-center gap-[33px] h-[80dvh]">
      <div className="w-[122px] h-[122px]">
        <img src={EMPTY} alt="결과 없음" className="w-full h-full object-contain" />
      </div>
      <p className="font-bold text-[30px] leading-[100%]">
        <span style={{ color: palette.secondary.secondaryDark }}>'{search}'</span>에 대한
        검색 결과가 없습니다.
      </p>
      <p
        className="font-normal text-[20px] leading-[100%] tracking-0"
        style={{ color: palette.gray.gray900 }}
      >
        다른 키워드로 검색해 보세요.
      </p>
    </div>
  );
};

export default NoResult;
