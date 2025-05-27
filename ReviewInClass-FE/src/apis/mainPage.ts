import type { ResponseAllLecturesDto, ResponseLectureRatingDto } from "../types/mainLectures";
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
