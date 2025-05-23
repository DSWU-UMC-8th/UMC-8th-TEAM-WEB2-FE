import { useNavigate } from "react-router-dom";
import Banner from "../components/common/Banner/Banner";
import MainReview from "../components/MainReview";

import { LECTURE } from "../data/banner";
import { mainDummyReview as REVIEWS } from "../data/mainDummyReview";
import palette from "../styles/theme";

const Main = () => {
  const navigate = useNavigate();

  const handlePopularClick = () => {
    navigate("review?sort=popular");
  };
  return (
    <div className="mt-[40px]">
      <Banner lectures={LECTURE.slice(0, 4)} />

      <div className="pl-[78px] pr-[78px] mt-[80px]">
        <div className="flex justify-between">
          <h3 className="font-medium text-[25px] leading-[100%] tracking-[0%]" style={{ color: palette.gray.gray900 }}>
            인기 리뷰
          </h3>
          <div
            onClick={handlePopularClick}
            className="font-semibold text-[20px] leading-[100%] tracking-[0%] cursor-pointer"
            style={{ color: palette.gray.gray700 }}
          >
            전체 보기 {">"}
          </div>
        </div>
      </div>

      <div className="pl-[78px] mt-[20px]">
        <MainReview reviews={REVIEWS} />
      </div>
    </div>
  );
};

export default Main;
