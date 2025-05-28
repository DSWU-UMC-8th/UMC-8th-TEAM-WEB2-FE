import type { ResponseAllLecturesDto, ResponseLatestReviewDto, ResponseLectureRatingDto, ResponsePopularReviewDto } from "../types/mainLectures";
import { axiosInstance } from "./axios";

// 배너 - 전체 강의 목록 조회
export const getAllLectures = async (): Promise<ResponseAllLecturesDto> => {
  const { data } = await axiosInstance.get("/api/lectures");

  return data;
};

// 배너 - 별점 조회
export const getLectureRating = async (lectureId: number): Promise<ResponseLectureRatingDto> => {
  const { data } = await axiosInstance.get(`/api/lecture/${lectureId}/ratings/summary`);

  return data;
};

// 인기 리뷰
export const getPopularReviews = async (): Promise<ResponsePopularReviewDto> => {
  const { data } = await axiosInstance.get("api/reviews/popular", {
    params: { page: 0 },
  });

  return data;
};

// 최신 리뷰
export const getLatestReviews = async (page: number): Promise<ResponseLatestReviewDto> => {
  const { data } = await axiosInstance.get("api/reviews/latest", {
    params: { page: `${page}` },
  });

  return data;
};
