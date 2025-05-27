import { useNavigate } from "react-router-dom";

import Banner from "../components/common/Banner/Banner";
import MainReview from "../components/MainReview";

import { mainDummyReview as REVIEWS } from "../data/mainDummyReview";
import { dummyReviews as LATEST } from "../data/dummyReviews";

import palette from "../styles/theme";
import ReviewCard from "../components/common/ReviewCard";
import { useEffect, useState } from "react";
import { getAllLectures } from "../apis/mainPage";
import type { Lectures } from "../types/mainLectures";

const Main = () => {
  const navigate = useNavigate();
  const [bannerData, setBannerData] = useState<Lectures[]>([]);
  const latestReviews = [...LATEST].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePopularClick = () => {
    scrollToTop();
    navigate("review?sort=popular");
  };

  const handleLatestClick = () => {
    scrollToTop();
    navigate("review?sort=latest");
  };

  useEffect(() => {
    const getBannerLectures = async () => {
      try {
        const data = await getAllLectures();

        setBannerData(data.result);
      } catch (error) {
        console.error("배너 데이터 오류", error);
      }
    };

    getBannerLectures();
  }, []);

  const shuffled = [...bannerData].sort(() => Math.random() - 0.5);

  return (
    <div className="mt-[40px]">
      <Banner lectures={shuffled.slice(0, 4)} />

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

      <div className="pl-[78px] pr-[78px] mt-[80px] mb-[80px]">
        <div className="flex justify-between">
          <h3 className="font-medium text-[25px] leading-[100%] tracking-[0%]" style={{ color: palette.gray.gray900 }}>
            최신 리뷰
          </h3>
          <div
            onClick={handleLatestClick}
            className="font-semibold text-[20px] leading-[100%] tracking-[0%] cursor-pointer"
            style={{ color: palette.gray.gray700 }}
          >
            전체 보기 {">"}
          </div>
        </div>

        <div className="mt-[20px] flex flex-col gap-[30px]">
          {latestReviews.map((review) => {
            return <ReviewCard {...review} key={review.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Main;
