import type { StudyPeriod } from "../enums/StudyPeriod";

export interface Lecture {
  id: number;
  name: string;
  instructor: string;
  platform: string;
}

export interface LectureSearchResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    lectures: Lecture[];
  };
}

export interface ReviewLectureInfo {
  name: string;
  instructorName: string;
  platformId: number | null;
  level: string;         
  category: string;      
}

export interface ReviewRequest {
  lectureId: number | null;
  lecture: ReviewLectureInfo;
  platformIds: (number | null)[];
  rating: number;
  content: string;
  studyPeriod: StudyPeriod;
}