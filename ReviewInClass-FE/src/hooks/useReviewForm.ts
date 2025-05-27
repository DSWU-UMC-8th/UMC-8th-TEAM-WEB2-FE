import { useState } from 'react';
import type { Lecture, ReviewLectureInfo, ReviewRequest } from '../types/reviewCreate';
import type { StudyPeriod } from '../enums/StudyPeriod';

interface UseReviewFormReturn {
    // ClassInfo
    selectedLecture: Lecture | null;
    setSelectedLecture: (lecture: Lecture | null) => void;
    isManualInput: boolean;
    setIsManualInput: (value: boolean) => void;
    manualLecture: ReviewLectureInfo;
    setManualLecture: (lecture: ReviewLectureInfo) => void;
    selectedPlatform: { id: number; name: string } | null;
    setSelectedPlatform: (platform: { id: number; name: string } | null) => void;
    imageFile: File | null;
    setImageFile: (file: File | null) => void;

    // WriteReview
    rating: number;
    setRating: (rating: number) => void;
    content: string;
    setContent: (content: string) => void;
    studyPeriod: StudyPeriod;
    setStudyPeriod: (period: StudyPeriod) => void;

    // Form 전송
    getReviewRequest: () => ReviewRequest;
}

export const useReviewForm = (): UseReviewFormReturn => {
  // ClassInfo
    const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
    const [isManualInput, setIsManualInput] = useState(false);
    const [manualLecture, setManualLecture] = useState<ReviewLectureInfo>({
        name: "",
        instructorName: "",
        platformId: null,
        level: "BEGINNER",
        category: "IT"
    });
    const [selectedPlatform, setSelectedPlatform] = useState<{ id: number; name: string } | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    // WriteReview
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState("");
    const [studyPeriod, setStudyPeriod] = useState<StudyPeriod>("WITHIN_A_WEEK");

    const getReviewRequest = () => {
        return isManualInput
        ? {
            lectureId: null,
            lecture: manualLecture,
            platformIds: [null],
            rating,
            content,
            studyPeriod,
            }
        : {
            lectureId: selectedLecture?.id ?? null,
            lecture: {
                name: selectedLecture?.name ?? "",
                instructorName: selectedLecture?.instructor ?? "",
                platformId: selectedPlatform?.id ?? null,
                level: "BEGINNER",
                category: "IT"
            },
            platformIds: selectedPlatform ? [selectedPlatform.id] : [null],
            rating,
            content,
            studyPeriod,
        };
    };

    return {
        // ClassInfo
        selectedLecture,
        setSelectedLecture,
        isManualInput,
        setIsManualInput,
        manualLecture,
        setManualLecture,
        selectedPlatform,
        setSelectedPlatform,
        imageFile,
        setImageFile,

        // WriteReview
        rating,
        setRating,
        content,
        setContent,
        studyPeriod,
        setStudyPeriod,

        // Form 전송
        getReviewRequest,
    };
}; 