import type { ResponseLectureReviewsDto } from "../types/detailPage";
import { axiosInstance } from "./axios";

interface GetLectureReviewsParams {
  sort?: "recommend" | "createdAt";
  ratingMin?: number;
  ratingMax?: number;
  page?: number;
}

export const getLectureReviews = async (
  lectureId: number,
  params?: GetLectureReviewsParams
): Promise<ResponseLectureReviewsDto> => {
  const { data } = await axiosInstance.get(`/api/lecture/${lectureId}/reviews`, {
    params,
  });

  return data;
};