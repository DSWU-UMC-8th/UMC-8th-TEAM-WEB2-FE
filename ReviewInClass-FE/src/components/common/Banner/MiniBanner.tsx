import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface Lecture {
  id: number;
  img: string;
}

interface BannerProps {
  lectures: Lecture[];
}

const MiniBanner = ({ lectures }: BannerProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings} className="w-full max-w-9xl mx-auto">
      {lectures.map((lecture) => (
        <div key={lecture.id} className="relative w-full h-[160px] rounded-xl overflow-hidden">
          <img src={lecture.img} alt="배너 이미지" className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-6 text-white text-l font-semibold bg-black/20 px-3 py-1 rounded">
            인터넷 강의 리뷰는 Review In Class
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default MiniBanner;
