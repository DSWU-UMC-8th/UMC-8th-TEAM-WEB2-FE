import { axiosInstance } from './axios';
import type { LectureSearchResponse } from '../types/lecture';

export const searchLectures = async (query: string): Promise<LectureSearchResponse> => {
    const { data } = await axiosInstance.get('/api/lecture/search', {
        params: { query }
    });

    return data;
};

export const searchPlatforms = async (query: string): Promise<LectureSearchResponse> => {
    const { data } = await axiosInstance.get('/api/platforms/search', {
        params: { query }
    });

    return data;
};