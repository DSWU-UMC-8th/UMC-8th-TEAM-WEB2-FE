import Star from "./common/Star";

import Profile from "../assets/profile.png";
import palette from "../styles/theme";
import { useNavigate } from "react-router-dom";
import type { Content } from "../types/mainLectures";

interface MainReviewProps {
  reviews: Content[];
}

const MainReview = ({ reviews }: MainReviewProps) => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleClickReview = (lectureId: number) => {
    scrollToTop();
    navigate(`/review/${lectureId}`);
  };

  return (
    <>
      <div className="flex gap-[24px] w-full overflow-x-scroll cursor-pointer" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {reviews.map((review) => {
          return (
            <div
              key={review.reviewId}
              onClick={() => handleClickReview(review.reviewId)}
              className="flex flex-col gap-[13px] p-[32px] min-w-[376px] w-full h-[232px] rounded-[24px] rounded-bl-[4px]"
              style={{ background: palette.white }}
            >
              <div className="font-semibold text-[20px] leading-[33.66px] tracking-[-0.01em]">{review.lectureName}</div>
              <Star star={review.rating} width={25.4} gap={8.89} />

              <p
                className="font-semibold text-[15px] leading-[22px] tracking-[-0.01em]"
                style={{
                  color: palette.gray.gray700,
                }}
              >
                {review.content}
              </p>

              <div className="flex gap-[12px] items-center">
                <div className="w-[48px] h-[48px] rounded-[50%] overflow-hidden">
                  <img src={Profile} alt="강사사진" className="w-full h-full object-cover" />
                </div>
                <div className="font-semibold text-[15px] leading-[33.66px] tracking-[-1%]">{review.instructorName}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MainReview;
