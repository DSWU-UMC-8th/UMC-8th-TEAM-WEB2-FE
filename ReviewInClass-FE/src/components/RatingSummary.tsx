import React from "react";
import Star from "./common/Star";
import palette from "../styles/theme";

type RatingDistribution = {
  label: string;
  count: number;
};

interface RatingSummaryProps {
  average: number;
  totalReviews: number;
  distribution: RatingDistribution[];
}

const ratingLabels = [
  "아주 좋아요",
  "맘에 들어요",
  "보통이에요",
  "그냥 그래요",
  "별로예요",
];

const RatingSummary: React.FC<RatingSummaryProps> = ({
  average,
  totalReviews,
  distribution,
}) => {
  const maxCount = Math.max(...distribution.map((d) => d.count), 1);

  return (
    <div className="flex flex-row items-center gap-[100px] w-[995px] h-[219px]">
      <div className="flex flex-col items-center gap-[17px] w-[296px] h-[219px]">
        <div
          className="text-[40px] font-semibold leading-[48px]"
          style={{ color: palette.gray.gray700 }}
        >
          {average.toFixed(2)}
        </div>

        <Star star={average} width={48} gap={14} />

        <div
          className="text-[20px] font-semibold leading-[24px] text-center"
          style={{ color: palette.primary.primaryDark }}
        >
          {totalReviews}개의 리뷰가 있습니다.
        </div>

        <button
          className="mt-2 w-[251px] h-[48px] rounded-[4px] text-[14px] font-bold flex justify-center items-center gap-2 shadow-sm"
          style={{
            backgroundColor: palette.gray.gray200,
            color: palette.gray.gray900,
          }}
        >
          상세 리뷰 보러가기 &gt;
        </button>
      </div>

      <div className="flex flex-col gap-3 w-[599px] h-[173px]">
        {distribution.map((item, idx) => {
          const barWidth = (item.count / maxCount) * 467;

          return (
            <div key={idx} className="flex items-center justify-between h-[19px]">
              <div
                className="w-[90px] text-[16px] font-semibold"
                style={{ color: palette.gray.gray700 }}
              >
                {ratingLabels[idx]}
              </div>

              <div className="relative w-[467px] h-[12px]">
                <div
                  className="w-full h-full rounded-[5px] opacity-50"
                  style={{ backgroundColor: palette.primary.primaryLight }}
                />
                <div
                  className="absolute top-0 left-0 h-full rounded-[5px]"
                  style={{
                    width: `${barWidth}px`,
                    backgroundColor: palette.primary.primaryDark,
                  }}
                />
              </div>

              <div
                className="w-[24px] text-[16px] font-semibold text-center"
                style={{ color: palette.gray.gray700 }}
              >
                {item.count}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RatingSummary;
