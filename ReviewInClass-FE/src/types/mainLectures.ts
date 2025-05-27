export type Lecture = {
  name: string;
  instructorName: string;
  platformName: string;
  level: string;
  category: string;
  imgUrls: string[];
};

export type Lectures = {
  lectureId: number;
  lecture: Lecture;
};

export type ResponseAllLecturesDto = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Lectures[];
};

export type Rates = {
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
  result: Rates;
};
