import React, {useState} from "react";
import palette from "../../styles/theme.ts";
import logoIcon from "../../assets/icon-logo.svg";
import thumbsUpColor from "../../assets/thumbs/icon-thumbs-color-up.svg";
import thumbsUp from "../../assets/thumbs/icon-thumbs-up.svg";
import thumbsDown from "../../assets/thumbs/icon-thumbs-down.svg";
import starEmpty from "../../assets/star/icon-star-empty.svg";
import starFull from "../../assets/star/icon-star-full.svg";
import starHalf from "../../assets/star/icon-star-half.svg";

// 별점 렌더링 함수
const renderStars = (rating: number) => {
  const stars = [];
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  for (let i = 0; i < full; i++) {
    stars.push(<img key={`full-${i}`} src={starFull} alt="별" className="w-4 h-4" />);
  }
  if (half) {
    stars.push(<img key="half" src={starHalf} alt="반 별" className="w-4 h-4" />);
  }
  while (stars.length < 5) {
    stars.push(
      <img key={`empty-${stars.length}`} src={starEmpty} alt="빈 별" className="w-4 h-4" />
    );
  }
  return stars;
};

const ReviewCard = ({
  rating, // 별점
  createdAt, // 작성 시간
  studyPeriod,  // 공부 기간
  likeCount,  // 좋아요 개수
  content, // 리뷰 내용
  imageUrl,  // 리뷰에 들어갈 사진
  profileImage,  // 프로필 사진
  category,  //카테고리
  level,  //난이도
}: {
  rating: string;
  createdAt: string;
  studyPeriod: string;
  likeCount: number;
  content: string;
  imageUrl?: string | null;
  profileImage?: string | null;
  category?: string;
  level?: string;
}) => {
  const [likes, setLikes] = useState(likeCount);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  const handleDislike = () => {
    setLikes((prev) => Math.max(prev - 1, 0)); // 0 이하로 내려가지 않도록
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 text-gray-900">
      {/* 상단 프로필 + 별점 + 시간 */}
      <div className="flex justify-between items-start text-sm mb-2">
        <div className="flex items-center gap-2">
          <img
            src={profileImage || logoIcon}
            alt="프로필"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex items-center gap-1 text-[14px]">
            {renderStars(parseFloat(rating))}
          </div>
        </div>
        <span className="text-gray-500">{createdAt}</span>
      </div>

      {/* 공부 기간 + 좋아요 */}
      <div className="flex gap-7 items-center ml-10 mt-1 mb-2 text-sm text-gray-700">
        <span>공부 기간: {studyPeriod}</span>
        <div className="flex items-center gap-1" style={{color: palette.gray.gray900}}>
          <img src={thumbsUpColor} alt="좋아요 아이콘" className="w-4 h-4" />
          <span>{likes}</span>
        </div>
      </div>

      {/* 리뷰 이미지 (있을 경우) */}
      {imageUrl && (
        <div className="my-2">
          <img
            src={imageUrl}
            alt="리뷰 이미지"
            className="w-full h-40 object-cover rounded"
          />
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
