import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Banner.css";
import Star from "../Star";
import type { Lectures } from "../../../types/mainLectures";
import { useEffect, useState } from "react";
import { getAllLectures, getLectureRating } from "../../../apis/mainPage";

/**
 * 강의 배너를 나타내는 컴포넌트입니다.
 *
 * * */

interface RatingMap {
  [lectureId: number]: number;
}

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const tags = ["입문자용", "초급", "완벽 설명"];

  const [ratings, setRatings] = useState<RatingMap>({});

  const [shuffledLectures, setShuffledLectures] = useState<Lectures[]>([]);

  useEffect(() => {
    const getBannerLectures = async () => {
      try {
        const data = await getAllLectures();

        const shuffled = [...data.result].sort(() => Math.random() - 0.5).slice(0, 5);
        setShuffledLectures(shuffled);
      } catch (error) {
        console.error("배너 데이터 오류", error);
      }
    };

    getBannerLectures();
  }, []);

  useEffect(() => {
    const getLectureRates = async () => {
      try {
        const lectureIds = shuffledLectures.map((lecture) => {
          return getLectureRating(lecture.lectureId).then((res) => ({
            lectureId: lecture.lectureId,
            rating: res.result.averageRating,
          }));
        });

        const results = await Promise.all(lectureIds);

        const lectureRatings: RatingMap = {};
        results.forEach(({ lectureId, rating }) => {
          lectureRatings[lectureId] = rating;
        });

        setRatings(lectureRatings);
      } catch (error) {
        console.error("배너 별점 오류", error);
      }
    };
    getLectureRates();
  }, [shuffledLectures]);

  return (
    <Slider {...settings} className="w-full">
      {shuffledLectures.map((lecture, idx) => (
        <div key={idx} className="pl-[78px] pr-[78px]">
          <div className="w-full h-[464px] rounded-[25.7px] overflow-hidden relative">
            <img src={lecture.lecture?.imgUrls?.[0] ?? ""} className="w-full h-full object-cover object-center" />
            <div
              className="absolute inset-0 bg-black"
              style={{
                background: "linear-gradient(180deg, rgba(0, 0, 0, 0.175) 0%, rgba(0, 0, 0, 0.3325) 43.75%, rgba(0, 0, 0, 0.35) 100%)",
              }}
            ></div>

            <div className="absolute bottom-10 left-15 flex flex-col gap-[15px]">
              <p className="font-semibold text-[45px] leading-[145%] tracking-0 text-white">{lecture.lecture?.name}</p>
              <div className="flex items-center gap-[19.57px]">
                <p className="font-medium text-[30px] leading-[100%] tracking-0 text-white">{lecture.lecture?.platformName}</p>
                <div className="w-[1.96px] h-[26px] bg-white"></div>
                <p className="font-medium text-[30px] leading-[100%] tracking-0 text-white">{lecture.lecture?.instructorName}</p>
              </div>

              <div className="flex gap-[12.73px]">
                {tags.map((tag, idx) => (
                  <div key={idx} className="pt-[2.55px] pr-[5.09px] pb-[2.55px] pl-[5.09px] bg-white/30 rounded-[5.09px] text-white">
                    # {tag}
                  </div>
                ))}
              </div>

              <Star star={ratings[lecture.lectureId] ?? 0} width={31.62} gap={11} />
            </div>

            <div className="absolute bottom-5 right-5">
              <div
                className="flex justify-center items-center gap-[10px] pt-[4px] pr-[14px] pb-[4px] pl-[14px] rounded-[24px]"
                style={{ backgroundColor: "rgba(22,29,36,0.4)" }}
              >
                <p className="font-normal text-[20px] leading-[145%] tracking-0 text-white">{idx + 1}</p>
                <div className="w-[1.96px] h-[20px] bg-white"></div>
                <p className="font-normal text-[20px] leading-[145%] tracking-0 text-white">4</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Banner;
