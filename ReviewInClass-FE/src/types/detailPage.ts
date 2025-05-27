export type Rating = {
  averageRating: number;
  reviewCount: number;
  ratingDistribution: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
  };
};

export type ResponseLectureRatingDto = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Rating;
};