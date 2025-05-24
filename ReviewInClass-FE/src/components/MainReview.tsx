import Star from "./common/Star";

import Profile from "../assets/profile.png";
import palette from "../styles/theme";

interface Review {
  id: number;
  title: string; // 강의명
  rating: number; // 별점
  content: string; // 리뷰 내용
  name: string; // 강사명
}

interface MainReviewProps {
  reviews: Review[];
}

const MainReview = ({ reviews }: MainReviewProps) => {
  const sortedReview = [...reviews].sort((a, b) => b.rating - a.rating).slice(0, 5); // 별점 높은 순 5개

  return (
    <>
      <div
        className="flex gap-[24px] w-full overflow-x-scroll"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {sortedReview.map((review) => {
          return (
            <div
              key={review.id}
              className="flex flex-col gap-[13px] p-[32px] min-w-[376px] w-full h-[232px] rounded-[24px] rounded-bl-[4px]"
              style={{ background: palette.white }}
            >
              <div className="font-semibold text-[20px] leading-[33.66px] tracking-[-0.01em]">{review.title}</div>
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
                <div className="font-semibold text-[15px] leading-[33.66px] tracking-[-1%]">{review.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MainReview;
