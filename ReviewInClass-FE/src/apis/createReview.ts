import { axiosInstance } from './axios';
import type { ReviewRequest } from '../types/reviewCreate';

// 강의 검색
export const searchLectures = async (query: string) => {
    const { data } = await axiosInstance.get('/api/lecture/search', {
        params: { query }
    });
    return data;
};

// 플랫폼 검색
export const searchPlatforms = async (query: string) => {
    const { data } = await axiosInstance.get('/api/platforms/search', {
        params: { query }
    });
    return data;
};

// 리뷰 등록 
export const postReview = async (body: ReviewRequest, file?: File) => {
    const formData = new FormData();
    
    // request 필드에 JSON 데이터 추가
    formData.append('request', JSON.stringify(body));

    // 이미지 파일이 있는 경우 추가
    if (file) {
        formData.append("imgUrls", file);
    }

    const { data } = await axiosInstance.post('/api/reviews', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
};

