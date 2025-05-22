import StarFull from "../../assets/star/icon-star-full.svg";
import StarHalf from "../../assets/star/icon-star-half.svg";
import StarEmpty from "../../assets/star/icon-star-empty.svg";

/**
 * 별점을 표시하는 컴포넌트입니다.
 * 별점 및 크기와 gap을 넘겨 사용하면됩니다.
 *
 * @param {number} star -- 별점 (ex. 5, 2.5 등..)
 * @param {number} width -- 별 가로 길이 (ex. 31.62)
 * @param {number} gap -- 별 사이 gap (ex. 11)
 *
 * **/

interface StarProps {
  star: number;
  width: number;
  gap: number;
}

const Star = ({ star, width, gap }: StarProps) => {
  const stars = [];
  const fullStars = Math.floor(star); // 별점 정수 부분
  const halfStar = star - fullStars >= 0.5; // 0.5 이상인 경우 반쪽 별 표시
  const emptyStar = 5 - fullStars - (halfStar ? 1 : 0); // 빈 별 표시

  for (let i = 0; i < fullStars; i++) {
    stars.push(<img src={StarFull} key={"full" + i} alt="star full" style={{ width: `${width}px` }} />);
  }

  if (halfStar) {
    stars.push(<img src={StarHalf} key={"half"} alt="star half" style={{ width: `${width}px` }} />);
  }

  for (let i = 0; i < emptyStar; i++) {
    stars.push(<img src={StarEmpty} key={"empty" + i} alt="star empty" style={{ width: `${width}px` }} />);
  }

  return (
    <div className="flex" style={{ gap: `${gap}px` }}>
      {stars}
    </div>
  );
};

export default Star;
