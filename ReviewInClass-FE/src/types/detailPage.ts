export type Review = {
  reviewId: number;
  content: string;
  rating: number;
  period: string;
  likes: number;
  imageUrl: string | null;
  createdAt: string;
};

export type LectureReviews = {
  reviews: Review[];
  totalMatchingReviews: number;
  listSize: number;
  totalPage: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
};

export type ResponseLectureReviewsDto = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: LectureReviews;
};
