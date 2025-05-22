import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Banner.css";
import Star from "../Star";

/**
 * 강의 배너를 나타내는 컴포넌트입니다.
 * 강의 내용이 담긴 배열을 넘겨 사용하면 됩니다.
 *
 * @param {array} lectures -- 강의 정보에 대한 배열
 *
 * * */

interface Lecture {
  id: number;
  img: string;
  title: string;
  platform: string;
  instructor: string;
  tags: string[];
  likes: number;
}

interface BannerProps {
  lectures: Lecture[];
}

const Banner = ({ lectures }: BannerProps) => {
  const settings = {
    dots: true,
    intinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings} className="w-full">
      {lectures.map((lecture, idx) => (
        <div key={lecture.id} className="pl-[78px] pr-[78px]">
          <div className="w-full h-[464px] rounded-[25.7px] overflow-hidden relative">
            <img src={lecture.img} className="w-full h-full object-cover object-center" />
            <div
              className="absolute inset-0 bg-black"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.175) 0%, rgba(0, 0, 0, 0.3325) 43.75%, rgba(0, 0, 0, 0.35) 100%)",
              }}
            ></div>

            <div className="absolute bottom-15 left-15 flex flex-col gap-[15px]">
              <p className="font-semibold text-[45px] leading-[145%] tracking-0 text-white">{lecture.title}</p>
              <div className="flex items-center gap-[19.57px]">
                <p className="font-medium text-[30px] leading-[100%] tracking-0 text-white">{lecture.platform}</p>
                <div className="w-[1.96px] h-[26px] bg-white"></div>
                <p className="font-medium text-[30px] leading-[100%] tracking-0 text-white">{lecture.instructor}</p>
              </div>

              <div className="flex gap-[12.73px]">
                {lecture.tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="pt-[2.55px] pr-[5.09px] pb-[2.55px] pl-[5.09px] bg-white/30 rounded-[5.09px] text-white"
                  >
                    # {tag}
                  </div>
                ))}
              </div>

              <Star star={lecture.likes} />
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
