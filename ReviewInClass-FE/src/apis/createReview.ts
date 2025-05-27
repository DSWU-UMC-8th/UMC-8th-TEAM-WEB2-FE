import { axiosInstance } from './axios';
import type { LectureSearchResponse } from '../types/lecture';

// 강의 검색
export const searchLectures = async (query: string): Promise<LectureSearchResponse> => {
    const { data } = await axiosInstance.get('/api/lecture/search', {
        params: { query }
    });

    return data;
};

// 플랫폼 검색
export const searchPlatforms = async (query: string): Promise<LectureSearchResponse> => {
    const { data } = await axiosInstance.get('/api/platforms/search', {
        params: { query }
    });

    return data;
};