export interface ReviewCardProps {
  rating: string; // 별점
  createdAt: string; //작성 시간
  studyPeriod: string; // 공부 기간
  likeCount: number; // 좋아요 개수
  content: string; // 리뷰 내용
  imageUrl?: string | null; // 리뷰에 들어갈 사진
  profileImage?: string | null; // 프로필 사진
  category?: string; // 카테고리
  level?: string; // 난이도
  teacher?: string; //강사
  lectureId: number; // 강의 번호
}
