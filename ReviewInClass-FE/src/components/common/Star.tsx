import StarFull from "../../assets/star/icon-star-full.svg";
import StarHalf from "../../assets/star/icon-star-half.svg";
import StarEmpty from "../../assets/star/icon-star-empty.svg";

/**
 * 별점을 표시하는 컴포넌트입니다.
 * 별점을 넘겨 사용하면됩니다.
 *
 * @param {number} star -- 별점 (ex. 5, 2.5 등..)
 *
 * **/

interface StarProps {
  star: number;
}

const Star = ({ star }: StarProps) => {
  const stars = [];
  const fullStars = Math.floor(star); // 별점 정수 부분
  const halfStar = star - fullStars >= 0.5; // 0.5 이상인 경우 반쪽 별 표시
  const emptyStar = 5 - fullStars - (halfStar ? 1 : 0); // 빈 별 표시

  for (let i = 0; i < fullStars; i++) {
    stars.push(<img src={StarFull} key={"full" + i} alt="star full" />);
  }

  if (halfStar) {
    stars.push(<img src={StarHalf} key={"half"} alt="star half" />);
  }

  for (let i = 0; i < emptyStar; i++) {
    stars.push(<img src={StarEmpty} key={"empty" + i} alt="star empty" />);
  }

  return <div className="flex gap-[11px]">{stars}</div>;
};

export default Star;
