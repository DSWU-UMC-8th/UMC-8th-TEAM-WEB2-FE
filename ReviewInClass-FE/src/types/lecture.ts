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