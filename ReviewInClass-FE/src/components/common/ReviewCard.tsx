import React, { useState } from "react";
import palette from "../../styles/theme.ts";
import logoIcon from "../../assets/icon-logo.svg";
import thumbsUpColor from "../../assets/thumbs/icon-thumbs-color-up.svg";
import thumbsUp from "../../assets/thumbs/icon-thumbs-up.svg";
import thumbsDown from "../../assets/thumbs/icon-thumbs-down.svg";
import type { ReviewCardProps } from "../../types/review.ts";
import Star from "./Star";
import { useNavigate } from "react-router-dom";

const ReviewCard = ({ rating, createdAt, studyPeriod, likeCount, content, imageUrl, profileImage, category, level, teacher, lectureId }: ReviewCardProps) => {
  const [likes, setLikes] = useState(likeCount);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  const handleDislike = () => {
    setLikes((prev) => Math.max(prev - 1, 0)); // 0 이하로 내려가지 않도록
  };

  const navigate = useNavigate();

  const handleClickReview = (lectureId: number) => {
    navigate(`/review/${lectureId}`);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 text-gray-900 cursor-pointer" onClick={() => handleClickReview(lectureId)}>
      {/* 상단 프로필 + 별점 + 시간 */}
      <div className="flex justify-between items-start text-sm mb-2">
        <div className="flex items-center gap-2">
          <img src={profileImage || logoIcon} alt="프로필" className="w-8 h-8 rounded-full object-cover" />
          <div className="flex items-center gap-1 text-[14px]">
            <Star star={parseFloat(String(rating ?? "0"))} width={16} gap={4} />
          </div>
        </div>
        <span className="text-gray-500">{createdAt}</span>
      </div>

      {/* 공부 기간 + 좋아요 */}
      <div className="flex gap-7 items-center ml-10 mt-1 mb-2 text-sm text-gray-700">
        <span>공부 기간: {studyPeriod}</span>
        <div className="flex items-center gap-1" style={{ color: palette.gray.gray900 }}>
          <img src={thumbsUpColor} alt="좋아요 아이콘" className="w-4 h-4" />
          <span>{likes}</span>
        </div>
      </div>

      {/* 리뷰 이미지 (있을 경우) */}
      {imageUrl && (
        <div className="my-2">
          <img src={imageUrl} alt="리뷰 이미지" className="w-full h-40 object-cover rounded" />
        </div>
      )}

      {/* 리뷰 내용 */}
      <p className="text-sm text-gray-800 mb-3 ml-10 whitespace-pre-line">{content}</p>

      {/* 유용해요 / 별로예요 버튼 */}
      <div className="flex gap-4 text-sm ml-10">
        <button onClick={handleLike} className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300">
          <img src={thumbsUp} alt="유용해요" className="w-4 h-4" />
          유용해요
        </button>
        <button onClick={handleDislike} className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300">
          <img src={thumbsDown} alt="별로예요" className="w-4 h-4" />
          별로예요
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
